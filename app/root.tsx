import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useNavigationType,
    useSearchParams,
    useNavigate,
} from "react-router";
import { useEffect, useCallback } from "react";

import "./app.css";

export const links = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant:wght@300;400;500;600&display=swap",
    },
];

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Otto Art Cellar" />
<link rel="manifest" href="/site.webmanifest" />
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

// Navigation listener component to detect React Router navigation and handle messages
function NavigationListener() {
    const location = useLocation();
    const navigationType = useNavigationType();
    const [searchParams, setSearchParams] = useSearchParams();

    // Remove bundleUrl parameter on initial load
    useEffect(() => {
        if (searchParams.has('bundleUrl')) {
            // Create a new copy of search params without the bundleUrl parameter
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('bundleUrl');

            // Update the URL without the bundleUrl parameter
            setSearchParams(newSearchParams, { replace: true });
            console.log('Removed bundleUrl parameter from URL');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on initial load

    // Navigation history state
    const navigate = useNavigate();
    const canGoBack = window.history.length > 1
    const canGoForward = window.history.state && window.history.state.idx < window.history.state.position
    const goBack = useCallback(() => {
        navigate(-1); // navigate back by 1 entry
    }, [navigate]);

    // Helper to go forward in history
    const goForward = useCallback(() => {
        navigate(1); // navigate forward by 1 entry
    }, [navigate]);


    // Send navigation capabilities to parent
    useEffect(() => {
        try {
            window.parent.postMessage({
                type: 'navigation_update',
                url: window.location.href,
                path: location.pathname,
                search: location.search,
                hash: location.hash,
                navigationType: navigationType
            }, '*');
            window.parent.postMessage({
                type: 'navigation_capabilities',
                canGoBack:  window.history.length > 1,
                canGoForward: window.history.state && window.history.state.idx < window.history.state.position
            }, '*');
        } catch (error) {
            console.error('Failed to send navigation capabilities to parent:', error);
        }
    }, [location, canGoBack, canGoForward]);



    useEffect(() => {
        const handleParentMessage = (event: MessageEvent) => {
            // Check if the message is a command from the parent
            if (event.data && typeof event.data === 'object' && 'command' in event.data) {
                const command = event.data.command;

                // Handle navigation commands
                switch (command) {
                    case 'refresh':
                        console.log('Received refresh command from parent');
                        window.location.reload();
                        break;
                    case 'goBack':
                        console.log('Received goBack command from parent');
                        if (canGoBack) {
                            goBack();
                        }
                        break;
                    case 'goForward':
                        console.log('Received goForward command from parent');
                        if (canGoForward) {
                            goForward();
                        }
                        break;
                    case 'checkNavigationState':
                        // Respond with current navigation state
                        window.parent.postMessage({
                            type: 'navigation_capabilities',
                            canGoBack: window.history.length > 1,
                            canGoForward: window.history.state && window.history.state.idx < window.history.state.position
                        }, '*');
                        break;
                    default:
                        // Unknown command
                        console.log('Received unknown command:', command);
                }
            }
        };

        // Add event listener for messages from parent
        window.addEventListener('message', handleParentMessage);

        // Clean up when component unmounts
        return () => {
            window.removeEventListener('message', handleParentMessage);
        };
    }, [location, navigationType]);

    return null;
}

export default function App() {
    return (
        <>
            <NavigationListener />
            <Outlet />
        </>
    );
}

export function ErrorBoundary({error}: { error: { status: number } }) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
