import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="pt-14">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-300 md:text-4xl dark:text-white">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-300">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link to="/" className="inline-flex text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
  )
}
