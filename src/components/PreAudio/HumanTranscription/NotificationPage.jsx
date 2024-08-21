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
const NotificationPage = ({
    humanTranscript
}) => {
    console.log("human transcript:", humanTranscript)
    return (


        <Dialog>
            <DialogTrigger asChild>
                <p className='underline font-semibold cursor-pointer hover:text-gray-200'>View</p>
            </DialogTrigger>
            <DialogContent className="md:min-w-[800px]  md:h-[600px] overflow-y-auto h-[500px] max-w-[350px]">
                <DialogHeader>
                    <DialogTitle>Human Transcript</DialogTitle>
                    <DialogDescription>
                        
                    </DialogDescription>
                </DialogHeader>
                <div className=' font-roboto'>

                    {
                        <div >

                            {
                                humanTranscript.sentimentAnalysisResults && humanTranscript.sentimentAnalysisResults.map((sentiment, i) => {
                                
                                    return (
                                        <div className="w-full py-2" key={i}>

                                            <span className="flex gap-2 md:text-lg text-sm">
                                              
                                                <p
                                                >
                                                    {sentiment.text}
                                                </p>

                                            </span>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    }

                </div>
                <DialogFooter>
                    {/* <Button onClick={handleGenerateNotes} type="submit">Proceed</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>



    )
}

export default NotificationPage
