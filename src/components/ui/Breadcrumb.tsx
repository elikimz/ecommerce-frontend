import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Capitalize and format segment names
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Handle specific route names
      switch (segment) {
        case "about":
          name = "About Us";
          break;
        case "faq":
          name = "FAQ";
          break;
        case "shop":
          name = "Shop";
          break;
        case "product":
          name = "Product";
          break;
        case "public-product":
          name = "Product";
          break;
        case "contact":
          name = "Contact";
          break;
        case "terms":
          name = "Terms & Conditions";
          break;
        case "privacy":
          name = "Privacy Policy";
          break;
        default:
          // For dynamic segments like product IDs, don't add them
          if (segment.match(/^\d+$/)) {
            return;
          }
      }

      breadcrumbs.push({
        name,
        url: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 mx-2 text-gray-400"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {isFirst && (
                    <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />
                  )}
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="text-orange-600 hover:text-orange-700 hover:underline flex items-center"
                >
                  {isFirst && (
                    <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                  )}
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
