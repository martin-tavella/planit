import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ChevronDown, Filter } from "lucide-react";

interface FilterOptionProps {
  priority?: string;
  setPriority?: (value: string) => void;
  status?: string;
  setStatus?: (value: string) => void;
}

const FilterOption = ({
  priority,
  setPriority,
  status,
  setStatus,
}: FilterOptionProps) => {
  const priorityOptions = [
    { value: "any", label: "Any Priority" },
    { value: "low", label: "Low" },
    { value: "mid", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  if (priority) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/90 border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
          >
            <Filter className="w-4 h-4 mr-2" />
            Priority: {priorityOptions.find((p) => p.value === priority)?.label}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-[#a98af7]/20">
          {priorityOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setPriority!(option.value)}
              className="hover:bg-[#a98af7]/10 focus:bg-[#a98af7]/10"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/90 border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
        >
          Status: {statusOptions.find((s) => s.value === status)?.label}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border-[#a98af7]/20">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setStatus!(option.value)}
            className="hover:bg-[#a98af7]/10 focus:bg-[#a98af7]/10"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    );
  }
};

export default FilterOption;
