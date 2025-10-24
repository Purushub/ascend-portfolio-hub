import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RatingComment = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ name: string; rating: number; comment: string; date: string }>>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, rating, and comment.",
        variant: "destructive"
      });
      return;
    }

    const newComment = {
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };

    setComments([newComment, ...comments]);
    setName("");
    setComment("");
    setRating(0);
    
    toast({
      title: "Comment Added!",
      description: "Thank you for your feedback.",
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white dark:text-white mb-2">Ratings & Comments</h2>
        <p className="text-muted-foreground">Share your feedback and see what others are saying</p>
      </div>

      {/* Add Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">Submit Comment</Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
          {comments.map((comment, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{comment.name}</p>
                        <p className="text-sm text-muted-foreground">{comment.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= comment.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{comment.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
