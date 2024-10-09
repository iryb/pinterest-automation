import { notFound } from "next/navigation";
import {
  getCustomerById,
  getPinterestBoards,
  getProductSections,
  getAutomationRules,
} from "@/lib/db";

interface PageProps {
  params: {
    customerId: string;
  };
}

export default async function CustomerPage({ params }: PageProps) {
  const { customerId } = params;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  const [pinterestBoards, productSections, automationRules] = await Promise.all(
    [
      getPinterestBoards(customerId),
      getProductSections(customerId),
      getAutomationRules(customerId),
    ]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <p>Customer ID: {customer.id}</p>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Etsy Store Name: {customer.etsyStoreName}</p>
      <p>Created At: {customer.createdAt.toLocaleDateString()}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">Pinterest Boards</h2>
      <ul>
        {pinterestBoards.map((board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Product Sections</h2>
      <ul>
        {productSections.map((section) => (
          <li key={section.id}>{section.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Automation Rules</h2>
      <ul>
        {automationRules.map((rule) => (
          <li key={rule.id}>{rule.name}</li>
        ))}
      </ul>
    </div>
  );
}
