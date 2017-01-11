export class Lesson {
  constructor(
    public $key: string,
    public description: string,
    public duration: string,
    public url: string,
    public tags: string,
    public videoUrl: string,
    public longDescription: string,
    public courseId: string
  ) {
  }

  static fromJsonList(arrayOfLessonObservables):Lesson[] {
    return arrayOfLessonObservables.map(inputJsonSingleLesson =>
      Lesson.fromJson(inputJsonSingleLesson));

  }

  static fromJson({
      $key,
      description,
      duration,
      url,
      tags,
      videoUrl,
      longDescription,
      courseId}):Lesson {
    return new Lesson($key, description, duration, url, tags, videoUrl, longDescription, courseId);
  }
}
