(() => {
	'use strict';
	var e,
		t = {
			829: function (e, t, i) {
				var s =
					(this && this.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = s(i(524)),
					l = s(i(678)),
					r = s(i(541));
				class h extends a.default {
					constructor(e, t) {
						super(),
							(this.root = e),
							(this.stance = t),
							(this.step = 1),
							(this.value = 0),
							(this.stepCount = 0),
							(this.stepPercent = 0),
							(this.offset = 0),
							(this.stepOffset = 0),
							(this.cursorOffset = 0),
							(this.isDecimal = !1),
							(this.decimalPlaces = 0),
							(this.endsValidation = r.default.bind(this)),
							(this.prepareOffset = l.default.bind(this));
					}
					setStep(e, t) {
						(this.step = e),
							(this.stepCount = (t.max - t.min) / e),
							(this.stepPercent = 100 / this.stepCount);
					}
					calculateValue(e) {
						return (this.stepOffset / this.stepPercent) * this.step + e.min;
					}
					setValue(e) {
						this.value = e;
					}
					setStance(e) {
						this.stance = e;
					}
					setIsDecimal(e, t) {
						(this.isDecimal = e), (this.decimalPlaces = t);
					}
					calculateOffset(e, t) {
						return this.prepareOffset((this.value - e.min) / ((e.max - e.min) / 100), t);
					}
					setOffset(e) {
						this.offset = e;
					}
					setStepOffset(e) {
						this.stepOffset = e;
					}
					calculateStepOffset() {
						return Math.round(this.cursorOffset / this.stepPercent) * this.stepPercent;
					}
					setCursorOffset(e) {
						this.cursorOffset = e;
					}
					updateThumbValue(e, t, i, s) {
						'horizontal' === s ? this.setCursorOffset(i) : this.setCursorOffset(100 - i),
							this.setStepOffset(this.calculateStepOffset()),
							this.setValue(this.calculateValue(t)),
							this.setOffset(this.calculateOffset(t, s)),
							this.endsValidation(t, s),
							this.notify('UpdateThumbView', this.value, this.offset, e, this.cursorOffset),
							this.notify('UpdateTipView', e, this.offset, this.value),
							this.notify('UpdatePanelValues', this.value, e);
					}
					getValue() {
						return this.value;
					}
					getOffset() {
						return this.offset;
					}
					getState() {
						return {
							step: this.step,
							stepCount: this.stepCount,
							stepPercent: this.stepPercent,
							value: this.value,
							offset: this.offset,
							stepOffset: this.stepOffset,
							isDecimal: this.isDecimal,
							decimalPlaces: this.decimalPlaces,
						};
					}
				}
				t.default = h;
			},
			541: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t) {
						this.getOffset() > 100 &&
							(this.setOffset(100), this.setValue('horizontal' === t ? e.max : e.min)),
							this.getOffset() < 0 &&
								(this.setOffset(0), this.setValue('horizontal' === t ? e.min : e.max));
					});
			},
			678: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t) {
						return 'horizontal' === t ? e : 100 - e;
					});
			},
			610: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(524));
				class r extends l.default {
					constructor(e) {
						super(),
							(this.root = e),
							(this.ends = { min: 1, max: 100 }),
							(this.size = 200),
							(this.isRange = !1),
							(this.direction = 'horizontal'),
							(this.fillSize = 0),
							(this.fillOffset = 0),
							(this.hasFill = !0),
							(this.hasTips = !0),
							(this.hasScale = !0);
					}
					setEnds({ min: e, max: t }) {
						this.ends = { min: e, max: t };
					}
					setSize(e) {
						this.size = e;
					}
					setIsRange(e) {
						this.isRange = e;
					}
					setDirection(e) {
						this.direction = e;
					}
					setSubViews(e, t, i) {
						(this.hasScale = i), (this.hasTips = t), (this.hasFill = e);
					}
					calculateFillSize(e) {
						let t = 0;
						return (
							this.isRange
								? (t +=
										'horizontal' === e
											? parseInt(s(`${this.root} .slider__thumb-1`).css('left')) -
											  parseInt(s(`${this.root} .slider__thumb-0`).css('left'))
											: parseInt(s(`${this.root} .slider__thumb-0`).css('top')) -
											  parseInt(s(`${this.root} .slider__thumb-1`).css('top')))
								: ((t += parseInt(
										s(`${this.root} .slider__thumb-0`).css('horizontal' === e ? 'left' : 'bottom'),
								  )),
								  'vertical' === e &&
										(t += parseInt(s(`${this.root} .slider__thumb-0`).css('height')))),
							+((t / this.size) * 100).toFixed(1)
						);
					}
					setFillSize(e) {
						this.fillSize = e;
					}
					calculateFillOffset(e) {
						let t = 0;
						return (
							this.isRange
								? (t +=
										'horizontal' === e
											? parseInt(s(`${this.root} .slider__thumb-0`).css('left'), 10)
											: parseInt(s(`${this.root} .slider__thumb-1`).css('top'), 10))
								: (t = 0),
							+((t / this.size) * 100).toFixed(1)
						);
					}
					setFillOffset(e) {
						this.fillOffset = e;
					}
					updateTrackFill(e) {
						this.setFillSize(this.calculateFillSize(e)),
							this.setFillOffset(this.calculateFillOffset(e)),
							this.notify('UpdateTrackFillView', this.fillSize, this.fillOffset, e);
					}
					prepareChooseStance(e) {
						let t = 0;
						e > this.fillSize / 2 + this.fillOffset && (t = 1),
							'vertical' === this.direction && (t = +!t),
							this.isRange || (t = 0),
							this.notify('UpdateThumbModel', t, e, this.direction, this.size);
					}
					getState() {
						return {
							ends: this.ends,
							size: this.size,
							isRange: this.isRange,
							direction: this.direction,
							hasFill: this.hasFill,
							hasTips: this.hasTips,
							hasScale: this.hasScale,
						};
					}
					getFillSize() {
						return this.fillSize;
					}
					getFillOffset() {
						return this.fillOffset;
					}
					getFillState() {
						return {
							fillSize: this.getFillSize(),
							fillOffset: this.getFillOffset(),
						};
					}
				}
				t.default = r;
			},
			524: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = class {
						constructor(e = {}) {
							this.subscribers = e;
						}
						subscribe(e, t) {
							const i = this.subscribers[e];
							i ? i.push(t) : (this.subscribers[e] = [t]);
						}
						unsubscribe(e, t) {
							this.subscribers[e].filter(e => t != e);
						}
						notify(e, ...t) {
							this.subscribers[e].forEach(e => {
								e(...t);
							});
						}
					});
			},
			15: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(892)),
					r = a(i(610)),
					h = a(i(829)),
					o = a(i(294)),
					n = a(i(868)),
					u = a(i(349)),
					c = a(i(691)),
					d = a(i(102)),
					f = a(i(148)),
					p = a(i(664)),
					m = a(i(819)),
					b = a(i(185)),
					v = a(i(707));
				t.default = class {
					constructor(e, t) {
						(this.root = e),
							(this.trackModel = new r.default(e)),
							(this.view = new l.default(e)),
							(this.thumbs = []),
							(this.params = t),
							(this.thumbStance = 0),
							(this.clearHTML = o.default.bind(this)),
							(this.removeListeners = n.default.bind(this)),
							(this.subscribe = u.default.bind(this)),
							(this.updateThumbModelBeforeTrackClick = c.default.bind(this)),
							(this.updateThumbModel = b.default.bind(this)),
							(this.updateTrackFillModel = d.default.bind(this)),
							(this.updateThumbView = f.default.bind(this)),
							(this.updateTipView = p.default.bind(this)),
							(this.addListeners = v.default.bind(this)),
							(this.updateTrackFillView = m.default.bind(this));
					}
					init(e, t) {
						'rebuild' === t &&
							((this.params = e),
							(this.view.isRange = !1),
							this.removeListeners(),
							this.clearHTML(e.direction),
							(this.thumbStance = 0),
							(this.thumbs = [])),
							s(document).ready(() => {
								this.setTrackModelState(e).setViewState();
							}),
							this.createRangeSlider(e),
							this.addSliderClasses(e.direction),
							this.subscribe(),
							this.addListeners(e.isRange);
					}
					setTrackModelState({
						min: e,
						max: t,
						isRange: i,
						direction: a,
						hasFill: l,
						hasTips: r,
						hasScale: h,
					}) {
						const o = 'horizontal' === a ? s(this.root).width() : s(this.root).height();
						return (
							this.trackModel.setSize(o),
							this.trackModel.setEnds({ min: e, max: t }),
							this.trackModel.setIsRange(i),
							this.trackModel.setDirection(a),
							this.trackModel.setSubViews(l, r, h),
							this
						);
					}
					setViewState() {
						return this.view.setState(this.trackModel.getState()), this;
					}
					addSliderClasses(e) {
						s(this.root).addClass(`slider_${e}`),
							s(this.root).parent().addClass(`slider-parent_${e}`);
					}
					createSlider(
						{
							step: e,
							value: t,
							min: i,
							max: s,
							direction: a,
							hasTips: l,
							isDecimal: r,
							decimalPlaces: h,
						},
						o,
					) {
						this.createThumb(o),
							this.view.prepareDirectionForInteraction(a),
							this.setThumbModelState(o, e, Array.isArray(t) ? t[o] : t, i, s, r, h, a),
							this.createThumbView(o),
							this.creteTipView(a, o, l),
							this.setThumbView(o),
							this.setThumbPlacement(o),
							this.setTipPlacement(o);
					}
					createRangeSlider(e) {
						return (
							this.createSubViewsView(this.params),
							this.createSlider(e, this.thumbStance),
							e.isRange && ((this.thumbStance += 1), this.createSlider(e, this.thumbStance)),
							this.setTrackFillModel(e.direction),
							this.setTrackFillView(),
							this.setTrackFillPlacement(e.direction),
							this
						);
					}
					setThumbModelState(e, t, i, s, a, l, r, h) {
						return (
							this.thumbs.forEach(e => {
								e.setStep(t, { min: s, max: a });
							}),
							this.thumbs[e].setStance(e),
							this.thumbs[e].setValue(i),
							this.thumbs[e].setOffset(this.thumbs[e].calculateOffset({ min: s, max: a }, h)),
							this.thumbs[e].setIsDecimal(l, r),
							this
						);
					}
					setThumbView(e) {
						const {
							step: t,
							stepCount: i,
							stepPercent: s,
							value: a,
							offset: l,
							isDecimal: r,
							decimalPlaces: h,
						} = this.thumbs[e].getState();
						this.view.thumbView.setStep(t, s, i),
							this.view.thumbView.setValue(a, e),
							this.view.thumbView.setOffset(l, e),
							this.view.thumbView.setIsDecimal(r, h);
					}
					setThumbPlacement(e) {
						const { offset: t } = this.thumbs[e].getState();
						this.view.initialThumbPlacement(t, e);
					}
					setTrackFillModel(e) {
						s(document).ready(() => {
							this.trackModel.setFillSize(this.trackModel.calculateFillSize(e)),
								this.trackModel.setFillOffset(this.trackModel.calculateFillOffset(e));
						});
					}
					setTrackFillView() {
						s(document).ready(() => {
							this.view.setFillState(this.trackModel.getFillState());
						});
					}
					setTrackFillPlacement(e) {
						s(document).ready(() => {
							this.view.initialFillPlacement(e);
						});
					}
					setTipPlacement(e) {
						const { offset: t, value: i } = this.thumbs[e].getState();
						this.view.initialTipPlacement(t, e, i);
					}
					createThumb(e) {
						this.thumbs.push(new h.default(this.root, e));
					}
					createThumbView(e) {
						this.view.thumbView.createThumb(e);
					}
					createTrackView(e) {
						this.view.trackView.createTrack(e);
					}
					createScaleView(e, t, i, s, a) {
						this.view.scaleView.createScale(e, a), this.view.scaleView.createScaleMarks(t, i, s, e);
					}
					creteFillView(e, t) {
						this.view.fillView.createFill(e, t);
					}
					creteTipView(e, t, i) {
						this.view.tipView.createTip(e, t, i);
					}
					createSubViewsView({ direction: e, step: t, max: i, min: a, hasFill: l, hasScale: r }) {
						s(document).ready(() => {
							this.createTrackView(e),
								this.createScaleView(e, t, i, a, r),
								this.creteFillView(e, l);
						});
					}
				};
			},
			707: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						this.view.thumbView.dragAndDropThumb(0),
							this.view.trackView.clickTrack(),
							e && this.view.thumbView.dragAndDropThumb(1);
					});
			},
			302: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						let {
							min: t = 0,
							max: i = 100,
							step: s = 10,
							value: a = 0,
							isRange: l = !1,
							direction: r = 'horizontal',
							hasFill: h = !0,
							hasTips: o = !0,
							hasScale: n = !0,
							isDecimal: u = !1,
							decimalPlaces: c = 0,
						} = e;
						Array.isArray(a) || (a = [a]),
							a[0] < t && (a[0] = t),
							a[0] > i && (a[0] = i),
							a[1] > i && (a[1] = i),
							a[1] < t && (a[1] = t),
							a[0] > a[1] && (a[1] = a[0]),
							l && 1 === a.length && a.push(a[0]);
						const d = {
							min: t,
							max: i,
							step: s,
							value: a,
							isRange: l,
							direction: r,
							hasFill: h,
							hasTips: o,
							hasScale: n,
							isDecimal: u,
							decimalPlaces: c,
						};
						return e.onChange && (d.onChange = e.onChange), d;
					});
			},
			294: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						const t = 'horizontal' === e ? 'vertical' : 'horizontal';
						s(this.root).removeClass(`slider_${t}`),
							s(this.root).parent().removeClass(`slider-parent_${t}`),
							s(this.root).html('');
					});
			},
			185: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						this.thumbs[e].updateThumbValue(e, this.view.ends, t, i);
					});
			},
			691: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						this.trackModel.prepareChooseStance(e);
					});
			},
			102: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						this.trackModel.updateTrackFill(e);
					});
			},
			148: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						this.view.thumbView.setOffset(t, i),
							this.view.thumbView.setValue(e, i),
							this.view.thumbView.updateThumbPosition(t, i),
							(this.view.thumbView.activeStance = i),
							this.params.onChange && this.params.onChange(this.params);
					});
			},
			664: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						this.view.tipView.setOffset(e, t), this.view.tipView.updateTipsPosition(e, t, i);
					});
			},
			819: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						this.view.fillView.setSize(e),
							this.view.fillView.setOffset(t),
							this.view.fillView.updateFill(i);
					});
			},
			868: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function () {
						s(this.root).off();
					});
			},
			349: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function () {
						this.view.thumbView.subscribe('UpdateThumbModel', this.updateThumbModel.bind(this)),
							this.view.thumbView.subscribe(
								'UpdateTrackFillModel',
								this.updateTrackFillModel.bind(this),
							),
							this.view.trackView.subscribe(
								'UpdateThumbModelBeforeTrackClick',
								this.updateThumbModelBeforeTrackClick.bind(this),
							),
							this.view.trackView.subscribe(
								'UpdateTrackFillModel',
								this.updateTrackFillModel.bind(this),
							),
							this.thumbs.forEach(e => e.subscribe('UpdateTipView', this.updateTipView.bind(this))),
							this.thumbs.forEach(e =>
								e.subscribe('UpdateThumbView', this.updateThumbView.bind(this)),
							),
							this.trackModel.subscribe('UpdateThumbModel', this.updateThumbModel.bind(this)),
							this.trackModel.subscribe('UpdateTrackFillView', this.updateTrackFillView.bind(this));
					});
			},
			932: function (e, t, i) {
				var s =
					(this && this.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = s(i(15)),
					l = s(i(302));
				t.default = class {
					constructor(e, t) {
						(this.root = e),
							(this.params = (0, l.default)(t)),
							(this.presenter = new a.default(e, (0, l.default)(t))),
							this.init(this.params, 'init');
					}
					init(e, t) {
						this.presenter.init(e, t);
					}
				};
			},
			892: function (e, t, i) {
				var s =
					(this && this.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = s(i(746)),
					l = s(i(617)),
					r = s(i(524)),
					h = s(i(2)),
					o = s(i(336)),
					n = s(i(348)),
					u = s(i(755)),
					c = s(i(543)),
					d = s(i(347)),
					f = s(i(181)),
					p = s(i(578));
				class m extends r.default {
					constructor(e) {
						super(),
							(this.thumbView = new a.default(this)),
							(this.trackView = new l.default(this)),
							(this.scaleView = new h.default(this)),
							(this.fillView = new o.default(this)),
							(this.tipView = new c.default(this)),
							(this.root = e),
							(this.ends = { min: 0, max: 0 }),
							(this.size = 200),
							(this.isRange = !1),
							(this.direction = 'horizontal'),
							(this.hasFill = !0),
							(this.hasTips = !0),
							(this.hasScale = !0),
							(this.offsetDirection = 'left'),
							(this.fillDirection = 'width'),
							(this.initialThumbPlacement = n.default.bind(this)),
							(this.initialFillPlacement = u.default.bind(this)),
							(this.initialTipPlacement = d.default.bind(this)),
							(this.prepareDirectionForInteraction = f.default.bind(this)),
							(this.calculateCursorCoordinate = p.default.bind(this));
					}
					setState({
						isRange: e,
						direction: t,
						ends: i,
						size: s,
						hasTips: a,
						hasScale: l,
						hasFill: r,
					}) {
						(this.ends = i),
							(this.size = s),
							(this.isRange = e),
							(this.direction = t),
							(this.hasTips = a),
							(this.hasFill = r),
							(this.hasScale = l);
					}
					setFillState({ fillSize: e, fillOffset: t }) {
						this.fillView.setSize(e), this.fillView.setOffset(t);
					}
				}
				t.default = m;
			},
			336: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(524)),
					r = a(i(110));
				class h extends l.default {
					constructor(e) {
						super(),
							(this.view = e),
							(this.size = 0),
							(this.offset = 0),
							(this.updateFill = r.default.bind(this));
					}
					createFill(e, t) {
						t &&
							s(this.view.root).append(
								`<div class="slider__fill slider__fill_${e}" data-testid="test-fill"></div>`,
							);
					}
					setSize(e) {
						this.size = e;
					}
					setOffset(e) {
						this.offset = e;
					}
					getSize() {
						return this.size;
					}
					getOffset() {
						return this.offset;
					}
				}
				t.default = h;
			},
			110: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						this.view.isRange
							? s(`${this.view.root} .slider__fill_${e}`).css({
									[this.view.offsetDirection]: `${this.getOffset()}%`,
									[this.view.fillDirection]: `${this.getSize()}%`,
							  })
							: s(`${this.view.root} .slider__fill_${e}`).css({
									[this.view.fillDirection]: `${this.getSize()}%`,
							  });
					});
			},
			2: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(25));
				t.default = class {
					constructor(e) {
						(this.view = e), (this.createScaleMarks = l.default.bind(this));
					}
					createScale(e, t) {
						t &&
							s(this.view.root).append(
								`<div class="slider__scale slider__scale_${e}"  data-testid="test-scale"></div>`,
							);
					}
				};
			},
			25: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = i(396);
				t.default = function (e, t, i, l) {
					const r = (0, a.prepareScaleData)(i, t, e);
					let h = 0;
					'vertical' === l && r.reverse();
					for (let e = 0; e < r.length; e++) {
						s(`${this.view.root} .slider__scale`).append(
							`<div class="slider__scale-mark slider__scale-mark_${l}" data-testid="test-scale-mark" style="${this.view.offsetDirection}:${h}px"></div>`,
						);
						const t = s(`${this.view.root} .slider__scale`).children('.slider__scale-mark')[e];
						s(t).append(
							`<div class="slider__scale-number slider__scale-number_${l}" >${r[e]}</div>`,
						),
							(h += this.view.size / (r.length - 1));
					}
				};
			},
			396: (e, t) => {
				function i(e, t) {
					for (const i of t) if (e % i == 0) return i;
					return i(e - 1, t);
				}
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.prepareScaleData = void 0),
					(t.prepareScaleData = function (e, t, s) {
						const a = Math.round((t - e) / s + 1),
							l = a - 1,
							r = i(l, [3, 5, 7, 11]);
						let h = Math.max(Math.floor(l / r), 1);
						h = h < 15 ? Math.min(h, r) : h;
						const o = [];
						for (let t = 0; t < Math.ceil(a / h); t++) o.push(+(s * t * h + e).toFixed(1));
						return o;
					});
			},
			746: function (e, t, i) {
				var s =
					(this && this.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = s(i(524)),
					l = s(i(85)),
					r = s(i(989)),
					h = s(i(247));
				class o extends a.default {
					constructor(e) {
						super(),
							(this.view = e),
							(this.step = 0),
							(this.stepPercent = 0),
							(this.stepCount = 0),
							(this.value = []),
							(this.offset = []),
							(this.isDecimal = !1),
							(this.decimalPlaces = 0),
							(this.activeStance = 0),
							(this.updateThumbPosition = l.default.bind(this)),
							(this.validateCollision = r.default.bind(this)),
							(this.dragAndDropThumb = h.default.bind(this));
					}
					createThumb(e) {
						const t = document.querySelector(this.view.root),
							i = document.createElement('div');
						i.classList.add('slider__thumb'),
							i.classList.add(`slider__thumb-${e}`),
							null == t || t.appendChild(i),
							(i.dataset.testid = `test-thumb-${e}`);
					}
					setStep(e, t, i) {
						(this.step = e), (this.stepPercent = t), (this.stepCount = i);
					}
					setValue(e, t) {
						this.value[t] = e;
					}
					setOffset(e, t) {
						this.offset[t] = e;
					}
					setIsDecimal(e, t) {
						this.decimalPlaces = e ? t : 0;
					}
					getOffset() {
						return this.offset;
					}
				}
				t.default = o;
			},
			247: function (e, t, i) {
				var s =
					(this && this.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const a = s(i(422));
				t.default = function (e) {
					const t = document.querySelector(this.view.root),
						i = t => {
							(0, a.default)(t, { thisThumb: this, stance: e });
						};
					t.querySelector(`.slider__thumb-${e}`).addEventListener('mousedown', e => {
						e.preventDefault(), e.stopPropagation(), document.addEventListener('mousemove', i);
					}),
						document.addEventListener('mouseup', () => {
							document.removeEventListener('mousemove', i);
						});
				};
			},
			422: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, { thisThumb: t, stance: i }) {
						const { direction: s } = t.view,
							a = 'horizontal' === s ? e.clientX : e.clientY,
							l = t.view.calculateCursorCoordinate(a, s, t.view.root, t.view.size);
						let r = i;
						(r = t.view.isRange ? t.validateCollision(i) : i),
							t.notify('UpdateThumbModel', r, l, s, t.view.size),
							t.notify('UpdateTrackFillModel', s);
					});
			},
			85: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t) {
						s(`${this.view.root} .slider__thumb-${t}`).css({
							[this.view.offsetDirection]: `${e}%`,
						});
					});
			},
			989: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						const t = +!e;
						if (0 === e) {
							if (this.value[0] > this.value[1]) return this.setOffset(1, this.offset[0]), t;
						} else if (this.value[1] < this.value[0]) return this.setOffset(0, this.offset[1]), t;
						return e;
					});
			},
			543: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(524)),
					r = a(i(106));
				class h extends l.default {
					constructor(e) {
						super(),
							(this.view = e),
							(this.offset = []),
							(this.value = []),
							(this.updateTipsPosition = r.default.bind(this));
					}
					setOffset(e, t) {
						this.offset[t] = e;
					}
					getOffset() {
						return this.offset;
					}
					createTip(e, t, i) {
						i &&
							s(this.view.root).append(
								`<div class="slider__tip slider__tip-${t} slider__tip_${e}"></div>`,
							);
					}
				}
				t.default = h;
			},
			106: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						s(`${this.view.root} .slider__tip-${e}`).css({
							[this.view.offsetDirection]: `${t}%`,
						}),
							s(`${this.view.root} .slider__tip-${e}`).html(
								i.toFixed(this.view.thumbView.decimalPlaces),
							);
					});
			},
			617: function (e, t, i) {
				var s = i(563),
					a =
						(this && this.__importDefault) ||
						function (e) {
							return e && e.__esModule ? e : { default: e };
						};
				Object.defineProperty(t, '__esModule', { value: !0 });
				const l = a(i(50)),
					r = a(i(524));
				class h extends r.default {
					constructor(e) {
						super(), (this.view = e);
					}
					createTrack(e) {
						s(this.view.root).append(
							`<div class="slider__track slider__track_${e}" data-testid="test-track"></div>`,
						);
					}
					clickTrack() {
						s(this.view.root).on('mousedown', { thisTrack: this }, l.default);
					}
				}
				t.default = h;
			},
			50: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						const { thisTrack: t } = e.data,
							{ direction: i } = t.view,
							s = 'horizontal' === i ? e.clientX : e.clientY,
							a = t.view.calculateCursorCoordinate(s, i, t.view.root, t.view.size);
						t.notify('UpdateThumbModelBeforeTrackClick', a), t.notify('UpdateTrackFillModel', i);
					});
			},
			578: (e, t, i) => {
				var s = i(563);
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i, a) {
						return 'horizontal' === t
							? ((e - s(i).position().left) / a) * 100
							: ((e - s(i).position().top) / a) * 100;
					});
			},
			755: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						this.fillView.updateFill(e);
					});
			},
			348: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t) {
						this.thumbView.updateThumbPosition(e, t);
					});
			},
			347: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e, t, i) {
						this.tipView.updateTipsPosition(t, e, i);
					});
			},
			181: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = function (e) {
						(this.offsetDirection = 'horizontal' === e ? 'left' : 'top'),
							(this.fillDirection = 'horizontal' === e ? 'width' : 'height');
					});
			},
		},
		i = {};
	function s(e) {
		var a = i[e];
		if (void 0 !== a) return a.exports;
		var l = (i[e] = { id: e, loaded: !1, exports: {} });
		return t[e].call(l.exports, l, l.exports, s), (l.loaded = !0), l.exports;
	}
	(s.m = t),
		(e = []),
		(s.O = (t, i, a, l) => {
			if (!i) {
				var r = 1 / 0;
				for (u = 0; u < e.length; u++) {
					for (var [i, a, l] = e[u], h = !0, o = 0; o < i.length; o++)
						(!1 & l || r >= l) && Object.keys(s.O).every(e => s.O[e](i[o]))
							? i.splice(o--, 1)
							: ((h = !1), l < r && (r = l));
					if (h) {
						e.splice(u--, 1);
						var n = a();
						void 0 !== n && (t = n);
					}
				}
				return t;
			}
			l = l || 0;
			for (var u = e.length; u > 0 && e[u - 1][2] > l; u--) e[u] = e[u - 1];
			e[u] = [i, a, l];
		}),
		(s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
		(s.nmd = e => ((e.paths = []), e.children || (e.children = []), e)),
		(() => {
			var e = { 309: 0 };
			s.O.j = t => 0 === e[t];
			var t = (t, i) => {
					var a,
						l,
						[r, h, o] = i,
						n = 0;
					if (r.some(t => 0 !== e[t])) {
						for (a in h) s.o(h, a) && (s.m[a] = h[a]);
						if (o) var u = o(s);
					}
					for (t && t(i); n < r.length; n++) (l = r[n]), s.o(e, l) && e[l] && e[l][0](), (e[l] = 0);
					return s.O(u);
				},
				i = (self.webpackChunkmetalampsliderplugin = self.webpackChunkmetalampsliderplugin || []);
			i.forEach(t.bind(null, 0)), (i.push = t.bind(null, i.push.bind(i)));
		})();
	var a = s.O(void 0, [216], () => s(932));
	a = s.O(a);
})();
