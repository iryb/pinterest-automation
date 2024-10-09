// Mock customer data
interface Customer {
  etsyStoreName: string;
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
let mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    createdAt: new Date("2023-01-15"),
    etsyStoreName: "AliceHandmade",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    createdAt: new Date("2023-02-20"),
    etsyStoreName: "BobsCrafts",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    etsyStoreName: "CharlieTreasures",
    createdAt: new Date("2023-03-25"),
  },
];

// Function to get all customers
export async function getAllCustomers(): Promise<Customer[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCustomers;
}

// Function to get a customer by ID
export async function getCustomerById(id: string): Promise<Customer | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  const customer = mockCustomers.find((c) => c.id === id);
  return customer || null;
}

// Function to create a new customer
export async function createCustomer(
  customerData: Omit<Customer, "id" | "createdAt">
): Promise<Customer> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  const newCustomer: Customer = {
    id: (mockCustomers.length + 1).toString(),
    ...customerData,
    createdAt: new Date(),
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
}

// Function to update a customer
export async function updateCustomer(
  id: string,
  customerData: Partial<Omit<Customer, "id" | "createdAt">>
): Promise<Customer | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150));
  const customerIndex = mockCustomers.findIndex((c) => c.id === id);
  if (customerIndex === -1) return null;

  mockCustomers[customerIndex] = {
    ...mockCustomers[customerIndex],
    ...customerData,
  };
  return mockCustomers[customerIndex];
}

// Function to delete a customer
export async function deleteCustomer(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  const initialLength = mockCustomers.length;
  mockCustomers = mockCustomers.filter((c) => c.id !== id);
  return mockCustomers.length < initialLength;
}

// New interfaces
interface PinterestBoard {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface ProductSection {
  id: string;
  name: string;
  description: string;
}

interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
}

// Mock data for new entities
const mockPinterestBoards: PinterestBoard[] = [
  {
    id: "1",
    name: "Home Decor Ideas",
    description: "Inspiring home decor pins",
    url: "https://pinterest.com/user/home-decor",
  },
  {
    id: "2",
    name: "Fashion Trends",
    description: "Latest fashion trends and outfits",
    url: "https://pinterest.com/user/fashion-trends",
  },
  {
    id: "3",
    name: "DIY Projects",
    description: "Fun DIY project ideas",
    url: "https://pinterest.com/user/diy-projects",
  },
];

const mockProductSections: ProductSection[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Gadgets and electronic devices",
  },
  { id: "2", name: "Clothing", description: "Apparel and accessories" },
  {
    id: "3",
    name: "Home & Garden",
    description: "Products for home and garden",
  },
];

const mockAutomationRules: AutomationRule[] = [
  {
    id: "1",
    name: "New Product Pin",
    condition: "When a new product is added",
    action: "Create a new pin on the relevant board",
  },
  {
    id: "2",
    name: "Daily Promotion",
    condition: "Every day at 9 AM",
    action: 'Pin a featured product to the "Daily Deals" board',
  },
  {
    id: "3",
    name: "Seasonal Campaign",
    condition: "When season changes",
    action: "Update board cover images with seasonal themes",
  },
];

// Existing functions...

// Function to get Pinterest boards
export async function getPinterestBoards(
  customerId: string
): Promise<PinterestBoard[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150));
  // In a real application, you would filter boards based on customerId
  // For now, we'll just return all boards
  return mockPinterestBoards;
}

// Function to get product sections
export async function getProductSections(
  customerId: string
): Promise<ProductSection[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  // In a real application, you would filter sections based on customerId
  // For now, we'll just return all sections
  return mockProductSections;
}

// Function to get automation rules
export async function getAutomationRules(
  customerId: string
): Promise<AutomationRule[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 120));
  // In a real application, you would filter rules based on customerId
  // For now, we'll just return all rules
  return mockAutomationRules;
}

// Function to get a Pinterest board by ID
export async function getPinterestBoardById(
  id: string
): Promise<PinterestBoard | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  const board = mockPinterestBoards.find((b) => b.id === id);
  return board || null;
}

// Function to get a product section by ID
export async function getProductSectionById(
  id: string
): Promise<ProductSection | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  const section = mockProductSections.find((s) => s.id === id);
  return section || null;
}

// Function to get an automation rule by ID
export async function getAutomationRuleById(
  id: string
): Promise<AutomationRule | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  const rule = mockAutomationRules.find((r) => r.id === id);
  return rule || null;
}
