import type { NextPage } from "next";
import Item from "@components/Item";
import Layout from "@components/Layout";
import ProductList from "@components/Product-list";

const Loved: NextPage = () => {
  return (
    <Layout canGoBack title="관심목록">
      <div className="flex flex-col py-10 space-y-5">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
