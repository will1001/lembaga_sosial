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
