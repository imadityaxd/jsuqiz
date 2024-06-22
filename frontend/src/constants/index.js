import { CircleCheck } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { CirclePlay } from "lucide-react";
import { Settings } from "lucide-react";
import { Trophy } from "lucide-react";
import { Users } from "lucide-react";

export const features = [
  {
    title: "Why JS Quiz ?",
    description:
      "Challenge your JavaScript skills with curated JavaScript questions and detailed explanations for each answer.",
    icon: CircleCheck,
  },
  {
    title: "Build Your Logs",
    description:
      "Track your JavaScript progress with detailed logs. Review past JavaScript quizzes and identify areas for improvement.",
    icon: ClipboardList,
  },
  {
    title: "Interactive Quizzes",
    description:
      "Engage with dynamic JavaScript quizzes featuring real-time feedback and explanations after each attempt.",
    icon: CirclePlay,
  },
  {
    title: "Custom Quiz Creation",
    description:
      "Create custom JavaScript quizzes tailored to your learning goals. Select JavaScript topics and difficulty levels that suit you.",
    icon: Settings,
  },
  {
    title: "Leaderboard and Achievements",
    description:
      "Compete globally, earn badges, and track your ranking on our JavaScript leaderboard.",
    icon: Trophy,
  },
  {
    title: "Community Support and Resources",
    description:
      "Join our JavaScript community, get support, and access JavaScript tutorials and code snippets to enhance your learning.",
    icon: Users,
  },
];
