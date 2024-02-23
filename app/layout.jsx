import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse | Find the perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
