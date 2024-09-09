export const metadata = {
  title: "Firebase authentication example",
  description: "A small project to demonstrate how to use firebase authentication in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
