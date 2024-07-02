import { Link } from "react-router-dom";

export default function Result(prop) {
  return (
    <div className="px-14 py-12">
      <div>
        {prop.questions.map((question, index) => (
          <div key={index}>
            <h2 className="text-2xl text-orange-500 py-1">{`Q${index + 1}. ${
              question.question
            }`}</h2>
            <h3 className="text-white text-xl pb-6">
              <span className="text-orange-500">Ans.</span>
              {` ${question.answer}`}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-4">
        <Link to="/">
          <button className="bg-orange-500 px-2 py-2 rounded-lg">
            Go to home page
          </button>
        </Link>
      </div>
    </div>
  );
}
