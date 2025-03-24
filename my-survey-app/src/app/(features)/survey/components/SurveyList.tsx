import Link from "next/link";
import { Survey } from "@/types";

interface SurveyListProps {
  surveys: Survey[];
}

const SurveyList = ({ surveys }: SurveyListProps) => {
  if (surveys.length === 0) {
    return <div>No surveys available</div>;
  }

  return (
    <ul className="space-y-3">
      {surveys.map((survey) => (
        <li key={survey.id}>
          <Link href={`/survey/${survey.id}`}>{survey.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SurveyList;
