import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MdOutlinePublic,
  MdLock,
  MdArchive,
  MdOutlineStar,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const icons = {
  public: <MdOutlinePublic className="text-xl mx-2" />,
  private: <MdLock />,
  archived: <MdArchive className="text-xl mx-2" />,
  stars: <MdOutlineStar className="text-yellow-500 mx-2" />,
};

const Repo = ({
  archived,
  default_branch,
  name,
  visibility,
  stargazers_count,
  description,
  workflows = [],
}) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {name}
          <div className="flex">
            {stargazers_count} {icons["stars"]}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        Default Branch:{" "}
        <span className="font-bold text-lg">{default_branch}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        {workflows.map((workflow) => (
          <Badge>{workflow}</Badge>
        ))}

        {workflows.length === 0 && (
          <Badge variant="outline">No Installed Workflows</Badge>
        )}

        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{icons[visibility]}</TooltipTrigger>
              <TooltipContent>
                <p>
                  {visibility === "public"
                    ? "Public Repository"
                    : "Private Repository"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{icons[archived && "archived"]}</TooltipTrigger>
              <TooltipContent>
                <p>Archived Repository</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Repo;
