import { getCatById } from "@/services/catService";
import { CatDetails } from "./CatDetails";

interface CatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CatPage({ params }: CatPageProps) {
  const { id } = await params;
  const cat = await getCatById(id);

  if (!cat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cat Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The cat you&#39;re looking for doesn&#39;t exist or couldn&#39;t be
            loaded.
          </p>
          <a
            href="/cats"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Back to Cats
          </a>
        </div>
      </div>
    );
  }

  return <CatDetails cat={cat} />;
}
