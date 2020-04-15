import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'format',
	pure: true
})
export class NameFormatter implements PipeTransform {
	transform(input: string, arg1?: string, arg2?: string): any {
		input = input.toLowerCase().replace(/\s/g, '');
		if (arg1 && arg2)
			return `${input}${arg1}${arg2}`;
		else
			return `${input}${arg1}`;;
	}
}