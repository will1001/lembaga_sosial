import { findPaymentMethod } from '../data/paymentMethods';

export type DonationTransaction = {
  orderId: string;
  programId: string;
  programTitle: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  message: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  midtransToken?: string;
  midtransRedirectUrl?: string;
};

const STORAGE_KEY = 'cunindoensia_donation_transactions';

export function createDonationTransaction(
  data: Omit<DonationTransaction, 'orderId' | 'paymentStatus' | 'createdAt' | 'expiresAt'>
): DonationTransaction {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const orderId = `DON-${now.getTime()}-${Math.floor(Math.random() * 1000)}`;

  const transaction: DonationTransaction = {
    ...data,
    orderId,
    paymentStatus: 'pending',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  saveDonationTransaction(transaction);
  return transaction;
}

export function saveDonationTransaction(transaction: DonationTransaction): void {
  const transactions = getDonationTransactions();
  const existingIndex = transactions.findIndex((item) => item.orderId === transaction.orderId);

  if (existingIndex >= 0) {
    transactions[existingIndex] = transaction;
  } else {
    transactions.unshift(transaction);
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions.slice(0, 25)));
}

export function getDonationTransaction(orderId: string): DonationTransaction | undefined {
  return getDonationTransactions().find((transaction) => transaction.orderId === orderId);
}

export function getDonationTransactions(): DonationTransaction[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getPaymentInstruction(orderId: string): string[] {
  const transaction = getDonationTransaction(orderId);
  if (!transaction) return [];

  return findPaymentMethod(transaction.paymentMethod).instructions;
}

export type MidtransSnapTransaction = {
  orderId: string;
  token: string;
  redirectUrl: string;
  merchantId: string;
  clientKey: string;
};

export async function createMidtransSnapTransaction(
  transaction: DonationTransaction
): Promise<MidtransSnapTransaction> {
  const endpoint = import.meta.env.VITE_MIDTRANS_API_URL || 'http://127.0.0.1:8787/api/midtrans/create-transaction';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId: transaction.orderId,
      programId: transaction.programId,
      programTitle: transaction.programTitle,
      amount: transaction.amount,
      donorName: transaction.donorName,
      donorEmail: transaction.donorEmail,
      donorPhone: transaction.donorPhone,
      message: transaction.message,
      paymentMethod: transaction.paymentMethod,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Gagal membuat transaksi Midtrans');
  }

  return {
    orderId: data.orderId,
    token: data.token,
    redirectUrl: data.redirectUrl,
    merchantId: data.merchantId,
    clientKey: data.clientKey,
  };
}
