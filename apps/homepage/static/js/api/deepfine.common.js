/**
 * DEEP.FINE Web Common Script
 * @author hg.jeong (DEEP.FINE)
 * @since 2021.08.10
 * @version 1.0.0
 */

// 화이트리스트 처리
// 폼 넘겨주면 json string 형태로 리턴
var _secure_process = {
	change_form: function (form_data) {
		let data_arr = form_data.serializeArray();
		let send_obj = {};

		data_arr.forEach(function (item, i) {
			send_obj[item.name] = _secure_process.escapeXml(item.value);
		});
		let return_obj = JSON.stringify(send_obj);

		/* 에디터는 태그 명이 유지되어야함(화이트리스트) */
		/*		return_obj = return_obj.replace(/&lt;p&gt;/gi,"<p>")
					.replace(/&lt;&#47;p&gt;/gi,"</p>")
					.replace(/&lt;br&gt;/gi,"<br>")
					.replace(/&lt;&#47;br&gt;/gi,"</br>")
					.replace(/&lt;BR&gt;/gi,"<BR>")
					.replace(/&lt;&#47;BR&gt;/gi,"</BR>")
					.replace(/&lt;strong&gt;/gi,"<strong>")
					.replace(/&lt;&#47;strong&gt;/gi,"</strong>")
					.replace(/&lt;STRONG&gt;/gi,"<STRONG>")
					.replace(/&lt;&#47;STRONG&gt;/gi,"</STRONG>")
					.replace(/&lt;h5&gt;/gi,"<h5>")
					.replace(/&lt;&#47;h5&gt;/gi,"</h5>")
					.replace(/&lt;H5&gt;/gi,"<H5>")
					.replace(/&lt;&#47;H5&gt;/gi,"</H5>");*/

		return return_obj;
	},
	change_salesforce_form: function (form_data) {
		let data_arr = form_data.serializeArray();
		let send_obj = {};

		data_arr.forEach(function (item, i) {
			let id = form_data.find('[name="'+item.name+'"]').attr('id');
			if (id) {
				send_obj[id] = _secure_process.escapeXml(item.value);
			}
		});
		let return_obj = JSON.stringify(send_obj);

		/* 에디터는 태그 명이 유지되어야함(화이트리스트) */
		/*		return_obj = return_obj.replace(/&lt;p&gt;/gi,"<p>")
					.replace(/&lt;&#47;p&gt;/gi,"</p>")
					.replace(/&lt;br&gt;/gi,"<br>")
					.replace(/&lt;&#47;br&gt;/gi,"</br>")
					.replace(/&lt;BR&gt;/gi,"<BR>")
					.replace(/&lt;&#47;BR&gt;/gi,"</BR>")
					.replace(/&lt;strong&gt;/gi,"<strong>")
					.replace(/&lt;&#47;strong&gt;/gi,"</strong>")
					.replace(/&lt;STRONG&gt;/gi,"<STRONG>")
					.replace(/&lt;&#47;STRONG&gt;/gi,"</STRONG>")
					.replace(/&lt;h5&gt;/gi,"<h5>")
					.replace(/&lt;&#47;h5&gt;/gi,"</h5>")
					.replace(/&lt;H5&gt;/gi,"<H5>")
					.replace(/&lt;&#47;H5&gt;/gi,"</H5>");*/

		return return_obj;
	},
	escapeXml: function (text) {
		let cng_text = text;
		cng_text = cng_text
			.replace(/javascript/gi, 'x-javascript')
			.replace(/script/gi, 'x-script')
			.replace(/iframe/gi, 'x-iframe')
			.replace(/document/gi, 'x-document')
			.replace(/vbscript/gi, 'x-vbscript')
			.replace(/applet/gi, 'x-applet')
			.replace(/embed/gi, 'x-embed') // embed 태그를 사용하지 않을 경우만
			.replace(/object/gi, 'x-object') // object 태그를 사용하지 않을 경우만
			.replace(/frame/gi, 'x-frame')
			.replace(/grameset/gi, 'x-grameset')
			.replace(/layer/gi, 'x-layer')
			.replace(/bgsound/gi, 'x-bgsound')
			.replace(/alert/gi, 'x-alert')
			.replace(/onblur/gi, 'x-onblur')
			.replace(/onchange/gi, 'x-onchange')
			.replace(/onclick/gi, 'x-onclick')
			.replace(/ondblclick/gi, 'x-ondblclick')
			.replace(/enerror/gi, 'x-enerror')
			.replace(/onfocus/gi, 'x-onfocus')
			.replace(/onload/gi, 'x-onload')
			.replace(/onmouse/gi, 'x-onmouse')
			.replace(/onscroll/gi, 'x-onscroll')
			.replace(/onsubmit/gi, 'x-onsubmit')
			.replace(/onunload/gi, 'x-onunload');

		//화이트리스트 소스 나중에 시간되면 블랙리스트 -> 화이트리스트로 바꿔볼 예정
		/*		var escaped = '';
				for (var i = 0; i < text.length; i += 1) {
					var c = text.charAt(i);
					switch(c) {
						case '<': escaped += '&lt;'; break;
						case '>': escaped += '&gt;'; break;
						case '&': escaped += '&amp;'; break;
						case '"': escaped += '&quot;'; break;
						case '\'': escaped += '&#39'; break;
						case '#': escaped += '&#35;'; break;
						case ';': escaped += '&#59;'; break;
						case '!': escaped += '&#33;'; break;
						case '%': escaped += '&#37;'; break;
						case ',': escaped += '&#44;'; break;
						case '/': escaped += '&#47;'; break;
						case ':': escaped += '&#58;'; break;
						case '=': escaped += '&#61;'; break;
						case '@': escaped += '&#64;'; break;
						case '`': escaped += '&#96;'; break;
						case '~': escaped += '&#126;'; break;
						case '.': escaped += '&#46;'; break;
						case '?': escaped += '&#63;'; break;
						case '[': escaped += '&#91;'; break;
						case ']': escaped += '&#93;'; break;
						case '^': escaped += '&#94;'; break;
						case '{': escaped += '&#123;'; break;
						case '}': escaped += '&#125;'; break;
						case '(': escaped += '&#40;'; break;
						case ')': escaped += '&#41;'; break;
						case '$': escaped += '&#36;'; break;
						case '*': escaped += '&#42;'; break;
						case '+': escaped += '&#43;'; break;
						case '|': escaped += '&#124;'; break;
						default : escaped += c; break;
					}
				}*/
		return cng_text;
	},
};
