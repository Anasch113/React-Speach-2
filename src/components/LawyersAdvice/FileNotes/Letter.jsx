import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
const Letter = ({
    letterText,
    letterTextChange,
    handleGenerateNotes
}) => {
    return (


        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Generate Letter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]  h-[400px]">
                <DialogHeader>
                    <DialogTitle>Letter</DialogTitle>
                    <DialogDescription>
                        You can generate your notes how you want!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea rows= {"10"} value={letterText} onChange={letterTextChange} placeholder="Please write here how you want to generate your note case. We will generate the notes according to your instructions" />
                </div>
                <DialogFooter>
                    <Button onClick = {handleGenerateNotes} type="submit">Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>



    )
}

export default Letter
