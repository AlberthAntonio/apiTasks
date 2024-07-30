export class CreateTaskDto {
  private constructor(
    public readonly title: string,
    public readonly description: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { title, description } = object;

    if (!title) return ["Title is required"];
    if (!description) return ["Description is required"];

    return [undefined, new CreateTaskDto(title, description)];
  }
}
