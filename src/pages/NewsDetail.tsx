import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Calendar, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { sanity, urlFor } from '../sanityClient';
import type { SanityImageSource } from '../sanityClient';

type NewsPost = {
  _id: string;
  title: string;
  excerpt?: string;
  publishedDate?: string;
  author?: string;
  category?: string;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
};

const formatDate = (date?: string) => {
  if (!date) return '';
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '';

  return parsedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    sanity
      .fetch<NewsPost | null>(
        `*[_type == "post" && (slug.current == $slug || _id == $slug)][0] {
          ...,
          "author": coalesce(author_ref->name, author),
          "category": coalesce(category_ref->title, category),
          "publishedDate": coalesce(date, _createdAt)
        }`,
        {slug}
      )
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-16 text-center text-gray-600">
          Memuat berita...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Berita tidak ditemukan</h1>
          <Link
            to="/berita"
            className="mt-6 inline-block rounded-md bg-yellow-500 px-5 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24">
      <article>
        {post.image && (
          <div className="h-[360px] overflow-hidden md:h-[480px]">
            <img
              src={urlFor(post.image).width(1600).height(700).fit('crop').url()}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto max-w-4xl px-4 py-12">
          {post.category && (
            <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              {post.category}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-950 md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.publishedDate && (
              <span className="inline-flex items-center">
                <Calendar size={16} className="mr-1" />
                {formatDate(post.publishedDate)}
              </span>
            )}
            {post.author && (
              <span className="inline-flex items-center">
                <User size={16} className="mr-1" />
                {post.author}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p className="mt-8 text-xl leading-relaxed text-gray-700">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-lg mt-10 max-w-none prose-headings:text-gray-950 prose-a:text-yellow-600 prose-strong:text-gray-950">
            {post.content && post.content.length > 0 ? (
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({value}) => (
                      <img
                        src={urlFor(value).width(1000).auto('format').url()}
                        alt=""
                        className="rounded-lg"
                      />
                    ),
                  },
                }}
              />
            ) : (
              <p>Konten lengkap belum diisi.</p>
            )}
          </div>

          <Link
            to="/berita"
            className="mt-10 inline-block rounded-md bg-yellow-500 px-5 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Kembali ke Berita
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
