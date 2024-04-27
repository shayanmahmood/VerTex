import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/Stocks-images/`;

export const stocks = [
  {
    stockName: "Payoneer",
    perStockPrice: 5,
    isAvailable: true,
    availableStocks: 0.0000000004,
    owner: "poly",
    demand: 'low',
    image: imageUrl + "Payoneer.png",
    description:
      "Payoneer is a financial services company specializing in online money transfers and digital payment solutions.",
  },
  {
    stockName: "IQIYI Inc",
    perStockPrice: 4,
    isAvailable: false,
    availableStocks: 0.0000000004,
    owner: "Tom",
    demand: 'dead',
    image: imageUrl + "IQIYI.png",
    description:
      "iQIYI, Inc. (IQ) is a Chinese online entertainment company known for its streaming platform offering a wide range of content, ",
  },
  {
    stockName: "Microsoft",
    perStockPrice: 421.44,
    isAvailable: true,
    availableStocks: 7.6,
    owner: "bill",
    demand: 'high',
    image: imageUrl + "Microsoft.png",
    description:
      "Microsoft shares represent ownership in one of the world's leading technology companies, ",
  },
  {
    stockName: "Google",
    perStockPrice: 155.87,
    isAvailable: true,
    availableStocks: 0.68,
    owner: "Larry",
    demand: 'midway',
    image: imageUrl + "Google.png",
    description:
      "Google's stock represents ownership in Alphabet Inc., a leading technology company known for its dominance in search",
  },
  {
    stockName: "Nvidia",
    perStockPrice: 894.52,
    isAvailable: true,
    availableStocks: 2.4,
    owner: "Jensen",
    demand: 'high',
    image: imageUrl + "Nvidia.png",
    description:
      "NVIDIA shares represent ownership in the leading technology company known for its graphics processing units (GPUs) and advancements in artificial intelligence",
  },
  {
    stockName: "Meta",
    perStockPrice: 497.8,
    isAvailable: true,
    availableStocks: 2.8,
    owner: "Zack",
    demand: 'high',
    image: imageUrl + "Meta.png",
    description:
      "Meta shares represent ownership in Meta Platforms, Inc., a technology company known for its social media platforms",
  },
  {
    stockName: "Amazon",
    perStockPrice: 180,
    isAvailable: true,
    availableStocks: 0.5,
    owner: "Jeff",
    demand: 'high',
    image: imageUrl + "Amazon.png",
    description:
      "Amazon shares represent ownership in the e-commerce and technology giant, offering investors exposure to its diverse range of businesses,",
  },
  {
    stockName: "Apple",
    perStockPrice: 168,
    isAvailable: true,
    availableStocks: 2.4,
    owner: "Steve",
    demand: 'high',
    image: imageUrl + "Apple.png",
    description:
      "Apple Inc. (AAPL) is a global technology giant renowned for its iconic products like the iPhone and Mac.",
  },
];
