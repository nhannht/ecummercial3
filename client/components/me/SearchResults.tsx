
import { Input } from "@/components/ui/input"
import { Link} from "react/router-dom"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"

export default function SearchResults() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 md:px-6 py-3 flex items-center">
        <form className="flex-1 relative">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </form>
      </header>
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">
              Showing results for <span className="font-medium">your search query</span>
            </p>
          </div>
          <div className="grid gap-6">
            <div className="bg-background rounded-md shadow-sm overflow-hidden">
              <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Result thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Result Title</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    This is a brief description of the search result. It should provide a concise summary of the
                    content.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      example.com/result
                    </a>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-md shadow-sm overflow-hidden">
              <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Result thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Another Result</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    This is another search result with a brief description of the content.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      example.com/another-result
                    </a>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-md shadow-sm overflow-hidden">
              <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Result thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Third Result</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    This is the third search result with a brief description of the content.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      example.com/third-result
                    </a>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-md shadow-sm overflow-hidden">
              <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Result thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Fourth Result</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    This is the fourth search result with a brief description of the content.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      example.com/fourth-result
                    </a>
                  </div>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-md shadow-sm overflow-hidden">
              <Link href="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  alt="Result thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Fifth Result</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    This is the fifth search result with a brief description of the content.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">
                      example.com/fifth-result
                    </a>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}