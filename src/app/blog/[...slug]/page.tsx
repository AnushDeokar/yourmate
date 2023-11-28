import React from "react";
import { getBlogBySlug } from "@/app/actions/post";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { formatDate } from "@/utils/date";

async function BlogPage({ params }: { params: Params }) {
  const { slug } = params;
  const blogPost = await getBlogBySlug(slug);

  return (
    <div className="lg:px-[25%] xl:px-[27%] md:px-[10%] px-[2%] leading-7 flex flex-col gap-4">
      <p className="text-muted-foreground mt-8 text-sm">
        {formatDate(blogPost?.createdAt)} - 4min
      </p>
      <h1 className="md:text-5xl text-3xl font-bold">{blogPost?.title}</h1>

      <div className="flex h-10 my-4 items-center gap-2">
        <img
          src="https://api.dicebear.com/avatar.svg"
          className="h-full rounded-full"
        />
        <div className="flex flex-col justify-center gap-0">
          <h3 className="font-semibold">
            {blogPost?.user?.firstName} {blogPost?.user?.lastName}
          </h3>
          <p className="text-muted-foreground text-sm">
            Software developer | Tech Enthusisast
          </p>
        </div>
      </div>
      <img src={blogPost?.image} className="rounded-md w-full" />
      <div
        className="react-quill-display"
        dangerouslySetInnerHTML={{ __html: blogPost?.content as string }}
      />
    </div>
  );
}

export default BlogPage;
