export interface FormatterInterface {
	format: (value: number) => string;
	removeFormatting: (value: string) => string;
}