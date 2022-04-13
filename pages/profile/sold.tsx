import type { NextPage } from "next";
import Layout from "@components/Layout";
import ProductList from "@components/Product-list";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col py-10 space-y-5">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
