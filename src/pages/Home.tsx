import React, { FC,  useEffect, useState } from "react";
import Loader from "../components/Loader";
import { FormField } from "../components/FormField";
import { Card } from '../components/Card'
import { filtered } from "../utils";

interface IRenderCards {
  data: Array<any> | null,
  title: string
}



export const RenderCards = (props: IRenderCards) => {
  const { data, title } = props;
  
  if (data?.length) {
    return (
      <>
        {data.map((post: typeof data[0]) => <Card key={post._id} {...post} />)}
      </>
    )
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
  const [allPosts, setAllPosts] = useState<null | Array<any>>(null);
  const [searchText, setSearchText] = useState<string>("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }
  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    setSearchText('')
  }

  useEffect(() => {
    setLoading(true)
    fetch('http://127.0.0.1:65355')
      .then(response => response.json())
      .then(data => setAllPosts(data.data))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <div className=''>
          <h1 className="font-bold text-2xl">The Showcase</h1>
          <p className="mt-2 text-[#666e76] text-[14px]">
            Browse trough a collection of visually stunning images generated
            by my little app
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
                <h2 className="font-medium text-[#666e75] tx-xl my-3">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
            </>
          )}
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:gird-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCards data={filtered(allPosts as Array<any>,'prompt',searchText)} title="No search results" />
          ) : (
            <RenderCards data={allPosts} title="No posts found" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
