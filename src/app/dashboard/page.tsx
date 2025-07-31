import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import ListItems from "@/components/dashboard/ListItems";
import { Container } from "@radix-ui/themes";


const DashboardPage = () => {
  
  return (
    <Container className="py-6 h-[calc(100vh-4.1rem)]">
      <HeaderDashboard />
      <ListItems />
    </Container>
  );
};

export default DashboardPage;
