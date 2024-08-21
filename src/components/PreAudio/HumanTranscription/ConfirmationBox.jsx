import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
const ConfirmationBox = ({
    handleHumanTranscript,
    cost,
    transcriptDuration
}) => {
    return (


        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>Human Transcription</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[600px]  md:min-h-[400px] max-w-[300px] max-h-[450px] overflow-y-auto">
                <DialogHeader >
                    <DialogTitle className="mb-8">Human Transcription</DialogTitle>
                    <DialogDescription>
                        <div className="my-5">
                            You are going to send your transcription for human Transcribing. Our team will check your transcription, correct it and then send you after correcting it. We will notify you through email when it will be corrected. You will also find your transcriptions on transcription page when status will be completed on top right corner of the page. Please click on the Send Transcript to continue.
                        </div>
                        <span className="flex flex-col items-center  p-3 w-full text-white">
                            <span className="w-full flex justify-between p-2">
                                <p>Price per Minute</p> <p>0.5$</p>
                            </span>
                            <span className="w-full flex justify-between p-2 ">
                                <p className="text-start">Your Transcript Duration</p> <p>{transcriptDuration} min</p>
                            </span>
                            <span className="w-full flex justify-between p-2">
                                <p>Total Cost</p> <p>{cost} $</p>
                            </span>



                        </span>

                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleHumanTranscript} type="submit">Send Transcript</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>



    )
}

export default ConfirmationBox
