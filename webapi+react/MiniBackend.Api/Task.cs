public class Task
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public Status Status { get; set; } = Status.New;
    public DateTime DueDate { get; set; }
}

public enum Status
{
    New,
    InProgress,
    Done
}