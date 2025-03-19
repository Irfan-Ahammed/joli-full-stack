import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function JoliFilterCard() {
  return (
    <Card className="w-full max-w-sm p-4 shadow-lg rounded-2xl">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        
        {/* Job Type */}
        <div>
          <label className="text-sm font-medium">Job Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Salary Range */}
        <div>
          <label className="text-sm font-medium">Salary Range</label>
          <div className="flex gap-2">
            <Input type="number" placeholder="Min" className="w-1/2" />
            <Input type="number" placeholder="Max" className="w-1/2" />
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="text-sm font-medium">Location</label>
          <Input type="text" placeholder="Enter city or area" />
        </div>
        
        {/* Remote Work */}
        <div className="flex items-center gap-2">
          <Checkbox id="remote" />
          <label htmlFor="remote" className="text-sm">Remote Work Available</label>
        </div>
        
        {/* Apply Button */}
        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}