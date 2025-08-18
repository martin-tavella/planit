import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { TasksProvider } from "@/context/TaskContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider><TasksProvider>{children}</TasksProvider></AuthProvider>  
      </body>
    </html>
  );
}
