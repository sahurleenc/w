import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default function Article({ contentHtml, frontmatter }) {
  return (
    // Changed bg-black to bg-wiki-bg (your #494969 color)
    <div className="min-h-screen bg-wiki-bg text-[#eaecf0] font-sans flex flex-col md:flex-row">
      
      {/* LEFT SIDEBAR */}
      {/* Removed: md:border-r (No more right border) */}
      <aside className="w-full md:w-48 p-6 border-[#2a2a2a] hidden md:block shrink-0">
        <div className="mb-8">
            {/* Placeholder Image */}
            {/* You can replace the src later with your actual logo file in /public */}
            <div className="w-full h-12 bg-black/20 rounded flex items-center justify-center text-xs text-gray-400 border border-white/10">
               LOGO PLACEHOLDER
            </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="text-sm text-white/80 space-y-3">
           {/* We will turn these into icons later! */}
           <a href="#" className="block hover:text-white hover:underline">Main page</a>
           <a href="#" className="block hover:text-white hover:underline">Contents</a>
           <a href="#" className="block hover:text-white hover:underline">Random article</a>
           {/* Removed: Current events */}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-5xl mx-auto">
        
        {/* Removed: Top User Tools (Login, Talk, etc) */}
        {/* Removed: Tabs (Article, Read, History) */}

        {/* The Content Wrapper */}
        <div className="p-8 md:p-12">
            
            {/* Title */}
          <h1 className="text-[2.5rem] font-serif font-medium border-b border-[#d4d4ff]/20 pb-4 mb-6 leading-tight text-white shadow-sm">
                          {frontmatter.title}
                      </h1>

          {/* THE ARTICLE CONTENT */}
                      <article 
                        className="prose prose-invert prose-lg max-w-none 
                        prose-h1:border-b prose-h1:border-[#d4d4ff]/20 prose-h1:pb-2 prose-h1:font-serif
                        prose-h2:border-b prose-h2:border-[#d4d4ff]/20 prose-h2:pb-2 prose-h2:mt-8 prose-h2:font-serif
                        [&_p]:mb-6 [&_p]:leading-5.75 [&_p]:text-gray-100
                        prose-a:text-[#8eafff] prose-a:no-underline hover:prose-a:underline
                        text-[15px]"
                        dangerouslySetInnerHTML={{ __html: contentHtml }} 
                      />
            {/* Removed: Infobox Div */}

        </div>
      </main>
    </div>
  );
}

// Keep the getStaticPaths and getStaticProps EXACTLY the same!
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('p'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('p', slug + '.md'),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return { props: { frontmatter, contentHtml } };
}