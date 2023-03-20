import React, { FC, useState } from "react";
import Loader from "../components/Loader";
import { FormField } from "../components/FormField";
import { Card } from '../components/Card'

interface IRenderComponet {
  data: any;
  title: string;
}
export const RenderCards: FC<IRenderComponet> = ({
  data,
  title,
}: IRenderComponet) => {
  if (data?.length) {
    return data.map((post: typeof data[0]) => <Card key={post.id} {...post} />);
  } else {
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  }
};

const Home: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<null | Array<string>>(null);
  const [searchText, setSearchText] = useState<string>("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }
  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;
    setSearchText('')
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <div className=''>
          <h1 className="font-bold text-2xl">The Showcase</h1>
          <p className="mt-2 text-[#666e76] text-[14px]">
            Browse trough a collection of visually stunning images generated
            by...
          </p>
        </div>

        <div className="mt-16">
          <FormField
            labelName="Find posts"
            type="text"
            name="Find posts"
            placeholder='Find posts'
            value={searchText}
            handleChange={handleChange}
            handleClear={handleClear}
            required
          />
        </div>
        <div className="mt-16">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] tx-xl mt-3">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
            </>
          )}
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:gird-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCards data={[]} title="No search results" />
          ) : (
            <RenderCards data={[]} title="No posts found" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
