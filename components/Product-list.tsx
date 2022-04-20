import { ProductWithCount } from 'pages';
import useSWR from 'swr';
import Item from './Item';

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return (
    <>
      {data &&
        data[kind]?.map((record) => (
          <Item
            item={record.product.name}
            id={record.product.id}
            hearts={record.product._count.favs}
            price={record.product.price}
            key={record.id}
          />
        ))}
    </>
  );
}
