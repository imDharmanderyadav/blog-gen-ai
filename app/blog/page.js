'use client';

import Header from '@/components/Header';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const BlogContent = () => {
  const [blog, setBlog] = useState({ title: "Generating the Blog....", content: "" });
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        let response = await fetch("/api/generate?prompt="+prompt);
        let data = await response.json();
        setBlog(JSON.parse(data.json));
      } catch (error) {
        setBlog({title:"",content:"<h1>Error fetching blog.... </h1> <br/>Please try again...."});
        console.error("Error fetching blog:", error);
      }
    };

    if (prompt) {
      fetchBlog();
    } else {
      setBlog({title:"",content:"<h1>No prompt provided....</h1> <br/>Please provide a prompt in the URL query parameters."});
    }
  }, [prompt]);

  return (
    <div className="w-10/12 space-y-12 mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title === "Generating the Blog...." ? blog.title : ""}</h1>
      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

const BlogFallback = () => {
  return (
    <>
    <div className="w-10/12 space-y-12 mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Loading...</h1>
    </div>
    </>
  );
};

const BlogPage = () => {
  // const searchParams = useSearchParams();
  // const prompt = searchParams.get('prompt');

  return (
    <>
      <Header />
      <Suspense fallback={<BlogFallback />}>
        <BlogContent  />
      </Suspense>
    </>
  );
};

export default BlogPage;
