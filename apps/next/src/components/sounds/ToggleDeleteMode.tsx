import { Minus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useSoundsStore } from "~/store/useSoundsStore";

export default function ToggleDeleteModeButton() {
  const { toggleDeleteMode, toggleAddMode, isAddMode } = useSoundsStore();

  const handleSubmit = () => {
    if (isAddMode === true) {
      toggleDeleteMode();
      toggleAddMode();
    }
    toggleDeleteMode();
  };

  return (
    <Button onClick={handleSubmit}>
      <Minus />
    </Button>
  );
}
