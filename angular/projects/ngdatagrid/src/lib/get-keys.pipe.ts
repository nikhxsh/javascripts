import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getkeys'
})
export class GetkeysPipe implements PipeTransform {

	transform(value: any, ...args: any[]): any {
		let keys = [];
		for (let key in value) {
			if (value[key] != undefined)
				keys.push(key);
		}
		return keys;
	}
}
