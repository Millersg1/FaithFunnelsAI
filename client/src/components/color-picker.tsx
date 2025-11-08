import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0"
              style={{ backgroundColor: color }}
              data-testid={`button-color-picker-${label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexColorPicker color={color} onChange={onChange} />
          </PopoverContent>
        </Popover>
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          placeholder="#000000"
          data-testid={`input-color-hex-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
    </div>
  );
}
