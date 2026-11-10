<template>
	<div
	  class="app"
	  :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`"
	>
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper in-sport">
			<div class="wrapper__inner">
				<div class="container-full">
					<div class="page-sportbetting">
						<div id="bettech">
							<div id="bt-inner-page" style="font-family: Montserrat, sans-serif; background-color: rgb(13, 19, 28);">
								<div dir="ltr">
									<div class="bt3693" style="min-height: calc(100vh - 0px);">
										<div id="bt-modal-root" class="bt3694"></div>
										<div class="bt3718">
											<div class="bt3719" :class="isMobileFlag ? 'bt35' : ''">
												<!-- aisde -->
												<sportSide :isMobile="isMobileFlag"></sportSide>
												<div class="bt34">
													<div class="bt3487">
														<div class="bt4624">
															<div class="bt4625 bt5151">
																<div class="bt4629 bt5153" data-editor-id="blockTitle">
																	<span class="bt4632" style="width: 32px;">
																		<svg data-editor-id="myBetsIcon" data-cy="ic-mybets" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: rgb(65, 188, 44); width: auto; height: 32px;">
																			<path fill-rule="evenodd" clip-rule="evenodd" d="M5 6.7C5 4.68329 6.5966 3 8.625 3H17.375C19.4034 3 21 4.68329 21 6.7V19.3C21 21.3167 19.4034 23 17.375 23H8.625C6.5966 23 5 21.3167 5 19.3V6.7ZM8.625 5C7.75391 5 7 5.73437 7 6.7V19.3C7 20.2656 7.75391 21 8.625 21H17.375C18.2461 21 19 20.2656 19 19.3V6.7C19 5.73437 18.2461 5 17.375 5H8.625ZM22.375 10C22.375 9.44772 22.8227 9 23.375 9H24C25.6569 9 27 10.3431 27 12V26C27 27.6569 25.6569 29 24 29H14C12.3431 29 11 27.6569 11 26V25.3C11 24.7477 11.4477 24.3 12 24.3C12.5523 24.3 13 24.7477 13 25.3V26C13 26.5523 13.4477 27 14 27H24C24.5523 27 25 26.5523 25 26V12C25 11.4477 24.5523 11 24 11H23.375C22.8227 11 22.375 10.5523 22.375 10ZM10 16C9.44772 16 9 16.4477 9 17C9 17.5523 9.44772 18 10 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H10ZM9 13C9 12.4477 9.44772 12 10 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H10C9.44772 14 9 13.5523 9 13ZM10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10H16C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8H10Z"></path>
																		</svg>
																	</span>
																	<span class="bt4631">{{ $t('My Bets') }}</span></div>
															</div>
														</div>
														<div class="bt5154">
															<div class="bt5156">
																<div class="bt5157" style="margin-top: 2px; height: 33px;">
																	<div class="bt3500" style="height: 33px;">
																		<div class="bt3502">
																			<div class="bt3501" style="height: 33px;">
																				<div class="bt5158">
																					<div @click="onSettled(false)" class="bt4598 bt5159 bt5163 bt4603" :class="!isSettled ? 'bt5164' : ''">
																						<div class="bt4606">
																							<div class="bt4608">{{ $t('未结算') }}</div>
																						</div>
																					</div>
																					<div @click="onSettled(true)" class="bt4598 bt5159 bt5163 bt4603" :class="isSettled ? 'bt5164' : ''">
																						<div class="bt4606">
																							<div class="bt4608">{{ $t('已结算') }}</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- <div class="bt5184">
																<div class="bt5185" data-editor-id="datePicker">
																	<div class="bt5187 bt5189">
																		<div class="bt108 bt5190 bt5188" style="width: 16px; height: 16px;">
																			<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
																				<path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
																			</svg>
																		</div>Last Bets</div>
																</div>
															</div> -->
														</div>
														<div class="bt5191">
															<div class="bt5196 bt5194" v-if="records && records.length > 0">
																<div class="bt5197 bt5199 bt5195" v-for="(item, index) in records" :key="`orders${index}`">
																	<div data-editor-id="bet" class="bt5357">
																		<div class="bt5359">
																			<div class="bt5360">
																				<div class="bt5362">
																					<div class="bt5363">
																						<span class="bt5373" v-if="item.sert == 1">{{ $t('串关') }}</span>
																						<span class="bt5373" v-else>{{ $t('单关') }}</span>
																						<span class="bt5374">{{ timestampToTime(item.cte) }}</span>
																					</div>
																					<div class="bt5364">
																						<div class="bt5375">
																							<span class="bt5381 bt5383" v-if="item.st == 0">{{ $t('创建成功') }}</span>
																							<span class="bt5381 bt5383" v-else-if="item.st == 1">{{ $t('确认中') }}</span>
																							<span class="bt5381 bt5383" v-else-if="item.st == 2">{{ $t('拒单') }}</span>
																							<span class="bt5381 bt5383" v-else-if="item.st == 3">{{ $t('取消订单') }}</span>
																							<span class="bt5381 bt5383" v-else-if="item.st == 4">{{ $t('接单成功') }}</span>
																							<span class="bt5381 bt5383" v-else-if="item.st == 5">{{ $t('已结算') }}</span>
																							<span class="bt5381 bt5383" v-else>{{ $t('确认中') }}</span>
																						</div>
																					</div>
																				</div>
																				<!-- 单关 -->
																				<div v-if="item.sert == 0">
																					<div v-for="(ops,index) in item.ops" :key="`ops${index}`">
																						<div class="bt5384 bt5386">
																							<div class="bt5389">
																								<div class="bt5390">
																									<div class="bt5398 bt5404" data-editor-id="betSelectionCategory">
																										<div class="bt5399 bt5405 bt5396">
																											<span class="bt5400">
																												<svgIcon widthName="16" heightName="16" class="loc" :icon="getIcon(ops.sid)"></svgIcon>
																											</span>
																											<span class="bt5402 bt5406">
																												{{ ops.ln }}
																											</span>
																										</div>
																									</div>
																								</div>
																								<div class="bt5391">
																									<!-- <span class="bt5392">
																										<svg data-cy="ic-live-simple" width="16" height="16" viewBox="0 0 16 16" fill="#FF4E4E" xmlns="http://www.w3.org/2000/svg" style="display: block; fill: currentcolor; color: rgb(250, 48, 92); width: auto; height: 16px;">
																											<path d="M12.9628 3.20912C12.6766 2.93029 12.2125 2.93029 11.9263 3.20912C11.6401 3.48794 11.6401 3.94001 11.9263 4.21883C12.436 4.71538 12.8404 5.30487 13.1163 5.95365C13.3921 6.60242 13.5341 7.29777 13.5341 8C13.5341 8.70223 13.3921 9.39758 13.1163 10.0464C12.8404 10.6951 12.436 11.2846 11.9263 11.7812C11.6401 12.06 11.6401 12.5121 11.9263 12.7909C12.2125 13.0697 12.6766 13.0697 12.9628 12.7909C13.6087 12.1617 14.121 11.4148 14.4706 10.5928C14.8201 9.77079 15 8.88975 15 8C15 7.11025 14.8201 6.22921 14.4706 5.40719C14.121 4.58517 13.6087 3.83827 12.9628 3.20912Z"></path>
																											<path d="M10.0422 5.11529C10.3284 4.83647 10.7925 4.83647 11.0787 5.11529C11.4708 5.49724 11.7818 5.95068 11.994 6.44972C12.2062 6.94876 12.3155 7.48363 12.3155 8.02379C12.3155 8.56395 12.2062 9.09881 11.994 9.59786C11.7818 10.0969 11.4708 10.5503 11.0787 10.9323C10.7925 11.2111 10.3284 11.2111 10.0422 10.9323C9.75595 10.6535 9.75595 10.2014 10.0422 9.92257C10.2982 9.67322 10.5012 9.37719 10.6397 9.0514C10.7783 8.72561 10.8496 8.37642 10.8496 8.02379C10.8496 7.67115 10.7783 7.32197 10.6397 6.99617C10.5012 6.67038 10.2982 6.37436 10.0422 6.12501C9.75595 5.84618 9.75595 5.39412 10.0422 5.11529Z"></path>
																											<path d="M8.05198 9.51147C8.90891 9.51147 9.60359 8.83477 9.60359 8.00002C9.60359 7.16526 8.90891 6.48856 8.05198 6.48856C7.19504 6.48856 6.50036 7.16526 6.50036 8.00002C6.50036 8.83477 7.19504 9.51147 8.05198 9.51147Z"></path>
																											<path d="M6.05604 5.11529C5.76981 4.83647 5.30574 4.83647 5.0195 5.11529C4.62741 5.49724 4.31638 5.95068 4.10418 6.44972C3.89198 6.94876 3.78276 7.48363 3.78276 8.02379C3.78276 8.56395 3.89198 9.09881 4.10418 9.59786C4.31638 10.0969 4.62741 10.5503 5.0195 10.9323C5.30574 11.2111 5.76981 11.2111 6.05604 10.9323C6.34228 10.6535 6.34228 10.2014 6.05604 9.92257C5.80007 9.67322 5.59702 9.37719 5.45848 9.0514C5.31995 8.72561 5.24865 8.37642 5.24865 8.02379C5.24865 7.67115 5.31995 7.32197 5.45848 6.99617C5.59702 6.67038 5.80007 6.37436 6.05604 6.12501C6.34228 5.84618 6.34228 5.39412 6.05604 5.11529Z"></path>
																											<path d="M3.03717 3.20912C3.3234 2.93029 3.78748 2.93029 4.07371 3.20912C4.35994 3.48794 4.35994 3.94001 4.07371 4.21883C3.56397 4.71538 3.15962 5.30487 2.88375 5.95365C2.60788 6.60242 2.46589 7.29777 2.46589 8C2.46589 8.70223 2.60788 9.39758 2.88375 10.0464C3.15962 10.6951 3.56397 11.2846 4.07371 11.7812C4.35994 12.06 4.35994 12.5121 4.07371 12.7909C3.78748 13.0697 3.3234 13.0697 3.03717 12.7909C2.39131 12.1617 1.87898 11.4148 1.52944 10.5928C1.1799 9.77078 1 8.88975 1 8C1 7.11025 1.1799 6.22921 1.52944 5.40719C1.87898 4.58517 2.39131 3.83827 3.03717 3.20912Z"></path>
																										</svg>
																									</span> -->
																								</div>
																							</div>
																							<div class="bt5394">
																								<div class="bt5407">
																									<div class="bt5409">
																										<span>{{ ops.mn }}</span>
																									</div>
																									<div class="bt5410"></div>
																								</div>
																								<div class="bt5395">
																									<!-- <a target="_blank" rel="noopener noreferrer" href="https://s5.sir.sportradar.com/sp77/en/5/season/98903/h2h/match/38312927" class="bt5412">
																										<svg data-cy="stat" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="bt5413" style="fill: currentcolor; color: rgb(255, 255, 255); width: auto; height: 18px;">
																											<g clip-path="url(#clip0)">
																												<g opacity="1">
																													<rect x="3" y="7" width="2" height="5" rx="1"></rect>
																													<rect x="7" y="3" width="2" height="9" rx="1"></rect>
																													<rect x="11" y="5" width="2" height="7" rx="1"></rect>
																												</g>
																											</g>
																											<defs>
																												<clipPath id="clip0">
																													<rect width="16" height="16"></rect>
																												</clipPath>
																											</defs>
																										</svg>
																									</a> -->
																								</div>
																							</div>
																						</div>
																						<div class="bt5414" data-editor-id="betTotal">
																							<div class="bt5415" data-editor-id="betTotal">
																								<div>
																									<div>{{ ops.onm }}</div>
																								</div>
																								<div>{{ ops.od }}</div>
																							</div>
																							<div class="bt5415" data-editor-id="betTotal">
																								<div>{{ $t('Stake') }}</div>
																								<div>{{ numFormat(item.us) }}</div>
																							</div>
																							<div class="bt5417" v-if="item.st == 0 || item.st == 1 || item.st == 4">
																								<div>{{ $t('预估最大盈利') }}</div>
																								<div class="bt5419">{{ numFormat(item.mwa) }}</div>
																							</div>
																							<div class="bt5417" v-else-if="item.st == 5 && item.sa > 0">
																								<div>{{ $t('你赢了') }}</div>
																								<div class="bt5419">{{ numFormat(item.sa) }}</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div v-else>
																					<div>
																						<div>
																							<div class="bt2040" :class="expandOrderIds.includes(item.id) ? 'bt2043' : ''" @click="expand(item.id)" data-editor-id="betSelection">
																								<span class="bt2045">
																									<div class="bt101 bt2119" style="width: 16px; height: 16px;">
																										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
																											<path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
																										</svg>
																									</div>
																								</span>
																								<span class="bt2044" v-if="!expandOrderIds.includes(item.id)">{{ item.ic }}</span>
																								<div class="bt2041">{{ $t('串关') }} {{ item.ic }} {{ $t('项') }}</div>
																								<div class="bt2042" v-if="!expandOrderIds.includes(item.id)">
																									<div class="bt2217">
																										<span class="bt2218 bt2220" v-for="(ops,index) in item.ops" :key="`ops2${index}`" :style="`width: calc(50% - 2px);`"></span>
																										<!-- <span class="bt2218 bt2220" style="width: calc(50% - 0px);"></span> -->
																									</div>
																								</div>
																							</div>
																							<div style="height: 0; overflow: hidden; transition: height 0.25s ease 0s;" :style="{
																								'height' : `${expandOrderIds.includes(item.id) ? 'auto' : 0}`
																							}">
																								<div style="overflow: hidden;">
																									<div class="bt5443" v-for="(ops,index) in item.ops" :key="`ops1${index}`">
																										<div data-editor-id="betSelection" class="bt5384 bt5386 bt5385">
																											<span class="bt5387">{{ index + 1 }}</span>
																											<div class="bt5389">
																												<div class="bt5390">
																													<div class="bt5398 bt5566" data-editor-id="betSelectionCategory">
																														<div class="bt5399 bt5567 bt5396">
																															<span class="bt5400">
																																<svgIcon widthName="16" heightName="16" class="loc" :icon="getIcon(ops.sid)"></svgIcon>
																															</span>
																															<span class="bt5402 bt5568">
																																{{ ops.ln }}
																															</span>
																														</div>
																													</div>
																												</div>
																												<div class="bt5391">
																													<div class="bt5393">
																														<span class="bt2034 bt2200" v-if="ops.sr == 0">{{ $t('未结算') }}</span>
																														<span class="bt2034 bt2192" v-else-if="ops.sr == 2">{{ $t('走水') }}</span>
																														<span class="bt2034 bt2192" v-else-if="ops.sr == 3">{{ $t('全输') }}</span>
																														<span class="bt2034 bt2196" v-else-if="ops.sr == 4">{{ $t('全赢') }}</span>
																														<span class="bt2034 bt2196" v-else-if="ops.sr == 5">{{ $t('赢半') }}</span>
																														<span class="bt2034 bt2192" v-else-if="ops.sr == 6">{{ $t('输半') }}</span>
																														<span class="bt2034 bt2192" v-else-if="ops.sr == 7">{{ $t('取消') }}</span>
																													</div>
																												</div>
																											</div>
																											<div class="bt5394">
																												<div class="bt5407">
																													<div class="bt5408">{{ ops.bo }}</div>
																													<div class="bt5409">
																														<span>{{ ops.mn }}</span>
																													</div>
																													<div class="bt5410"></div>
																												</div>
																												<div class="bt5395">
																													<!-- <a target="_blank" rel="noopener noreferrer" href="https://s5.sir.sportradar.com/sp77/en/1/season/94215/h2h/match/34277511" class="bt5412">
																														<svg data-cy="stat" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="bt5413" style="fill: currentcolor; color: rgb(255, 255, 255); width: auto; height: 18px;">
																															<g clip-path="url(#clip0)">
																																<g opacity="1">
																																	<rect x="3" y="7" width="2" height="5" rx="1"></rect>
																																	<rect x="7" y="3" width="2" height="9" rx="1"></rect>
																																	<rect x="11" y="5" width="2" height="7" rx="1"></rect>
																																</g>
																															</g>
																															<defs>
																																<clipPath id="clip0">
																																	<rect width="16" height="16"></rect>
																																</clipPath>
																															</defs>
																														</svg>
																													</a> -->
																												</div>
																											</div>
																											<div class="bt5388">{{ ops.onm }}</div></div>
																									</div>
																								</div>
																							</div>
																						</div>
																						<div class="bt5414" data-editor-id="betTotal">
																							<!-- <div class="bt5415 bt5445" data-editor-id="betTotal">
																								<div>{{ $t('总赔率') }}</div>
																								<div>5.102</div>
																							</div> -->
																							<div class="bt5415" data-editor-id="betTotal">
																								<div>{{ $t('Stake') }}</div>
																								<div>{{ numFormat(item.us) }}</div>
																							</div>
																							<div class="bt5417" v-if="item.st == 0 || item.st == 1 || item.st == 4">
																								<div>{{ $t('预估最大盈利') }}</div>
																								<div class="bt5419">{{ numFormat(item.mwa) }}</div>
																							</div>
																							<div class="bt5417" v-else-if="item.st == 5 && item.sa > 0">
																								<div>{{ $t('你赢了') }}</div>
																								<div class="bt5419">{{ numFormat(item.sa) }}</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="bt5378">
																				<div>
																					<div class="bt5432 bt5434 bt5380" v-clipboard:copy="item.id" v-clipboard:success="onCopy">
																						<span>{{ $t('Ticket ID') }}: {{ item.id }}</span>
																						<svg data-cy="ic-copy" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: inherit; width: auto; height: 16px;">
																							<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4C2.5 3.17157 3.17157 2.5 4 2.5H8C8.82843 2.5 9.5 3.17157 9.5 4V9C9.5 9.82843 8.82843 10.5 8 10.5H4C3.17157 10.5 2.5 9.82843 2.5 9V4ZM4 3.5C3.72386 3.5 3.5 3.72386 3.5 4V9C3.5 9.27614 3.72386 9.5 4 9.5H8C8.27614 9.5 8.5 9.27614 8.5 9V4C8.5 3.72386 8.27614 3.5 8 3.5H4Z"></path>
																							<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 6C10.5 5.72386 10.7239 5.5 11 5.5H12C12.8284 5.5 13.5 6.17157 13.5 7V12C13.5 12.8284 12.8284 13.5 12 13.5H8C7.17157 13.5 6.5 12.8284 6.5 12C6.5 11.7239 6.72386 11.5 7 11.5C7.27614 11.5 7.5 11.7239 7.5 12C7.5 12.2761 7.72386 12.5 8 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V7C12.5 6.72386 12.2761 6.5 12 6.5H11C10.7239 6.5 10.5 6.27614 10.5 6Z"></path>
																						</svg>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<template v-else>
																<el-empty :image="$t('no_empty')" :description="loading ? $t('加载中') : $t('暂无数据')" />
															</template>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot />
		</div>
		<asidebar :flagShow="openedleft" @menuClick="menuClick" ></asidebar>
		<tabbar @menuClick="menuClick" ></tabbar>
		<div class="app-overlay" v-if="isMobileFlag" :class="openedleft?'visible':''" @click="menuClick"></div>
	</div>
</template>

<script>
import Head from '@/components/Head.vue'
import asidebar from '@/components/aside.vue'
import tabbar from '@/components/tabbar.vue'
import svgIcon from '@/components/svg.vue'
import Foot from '@/components/Foot.vue'
import sportSide from './components/sportSide.vue'
import betslipHelp from './components/betslipHelp.vue'
import { betOrderList_api } from '@/api/sports.js'
import fbSportsService from "../../common/fbSportsService";
export default {
	components: {
		Head,
		Foot,
		asidebar,
		tabbar,
		sportSide,
		svgIcon,
		betslipHelp
	},
	data() {
		return {
			betActive:'first',
			isMobileFlag:false,// 响应式
			openedleft:false,
			openedcontests:false,
			records: [],
			isSettled: false,
			current: 1, // page
			startTime: null,
			endTime: null,
			timeType: null,
			size: null,
			loading: false,
			expandOrderIds:[],
		};
	},
	methods: {
		expand(id) {
			if (this.expandOrderIds.includes(id)) {
				for( var i = 0; i < this.expandOrderIds.length; i++){
					if ( this.expandOrderIds[i] === id) {
						this.expandOrderIds.splice(i, 1);
					}
				}
			} else {
				this.expandOrderIds.push(id);
			}
		},
		getIcon(sid) {
			return fbSportsService.getSportsIconName(sid)
		},
		menuClick(){
			this.openedleft = !this.openedleft
		},
		contestsClick() {
		  this.openedcontests = !this.openedcontests;
		},
		onCopy: function() {
      this.successTips('Copy success');
    },
		onSettled(isSettled) {
			if (this.isSettled === isSettled) {
				return;
			}
			this.isSettled = isSettled;
			this.getOrderBets();
		},
		getOrderBets() {
			const cache_key = 'fb_order_bets';
			const self = this;
			self.records = [];
			// if (self.$helper.get(cache_key)) {
			// 	self.records = self.$helper.get(cache_key)
			// }
			let i18n = this.$helper.getLang();
			const languageType = fbSportsService.getLanguageType(i18n);
			let params = {
				languageType:languageType,
				isSettled: this.isSettled,
				startTime: this.startTime,
				endTime: this.endTime,
				current: this.current,
				timeType: this.timeType,
				// currencyId: 1000,
				currencyId: this.$helper.get("sportsCurrencyID")
			}
			this.loading = true;
			betOrderList_api(params).then(response => {
				if (response.data) {
					let result = response.data;
					if (!result.success) {
						this.loading = false;
						return
					}
					let data = result.data
					this.records = data.records;
					// self.$helper.set(cache_key, this.records);
					this.loading = false;
				}
			});
		},
	},
	mounted() {
		this.getOrderBets()
	},
	created() {
    this.openedleft = false;
		this.isPhone()
	}
}
</script>
<style scoped>
	.bet-card-top{
		font-size: 12px;
	}
	.text-green{
		color: #7ed321;
	}
	.bet-card-left .bt-tit{
		font-weight: bold;
		margin-right: 8px;
	}
	.bet-card-left .bt-date{
		color: rgba(255,255,255,0.5);
	}
	.bet-card-status{
		margin-left: auto;
	}

	.blockTitle{
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		line-height: 1;
	}
	.blockTitle .iconfont{
		font-size: 24px;
		color: #41bc2c;
		margin-right: 10px;
	}
	.blockTitle .tt{
		font-size: 22px;
	}
	.bet-card{
		color: #ffffff;
		border: 1px solid transparent;
		height: 100%;
		display: flex;
		opacity: 1;
		overflow: hidden;
		position: relative;
		background: #111923;
		box-sizing: border-box;
		min-height: 264px;
		border-color: #111923;
		border-radius: 6px;
		flex-direction: column;
		padding: 0 8px 16px;
	}
	.bet-card-top{
		height: 32px;
		display: flex;
		align-items: center;
	}
	.betSelection{
		color: #ffffff;
		border: 1px solid;
		height: 64px;
		display: flex;
		padding: 8px;
		position: relative;
		background: #19212b;
		box-sizing: border-box;
		border-color: #19212b;
		border-radius: 6px;
		flex-direction: column;
		justify-content: space-between;
		transition-duration: 0.5s;
		transition-property: background, backgroundColor, color;
	}
	.betSelectionCategory{
		display: flex;
		align-items: center;
		margin-bottom: 8px;
		font-size: 12px;
		color: rgba(255,255,255,0.5);
	}
	.betSelectionCategory:hover{
		color: rgba(255,255,255,0.88);
	}
	.betTotal{
		min-height: 120px;
	}
	.betTotal-row{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:12px;
		padding-top: 8px;
		opacity: 0.4;
		font-size: 12px;
		font-weight: 600;
	}
	.betTotal-total-row{
		opacity: 1;
		font-size: 14px;
	}
	.bet-card-ft{
		margin-top: 8px;
	}
	.betEventId{
		opacity: 0.4;
		font-size: 12px;
	}
	.betSelectionVs{
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	.betSelectionVs .vs{
		opacity: .5;
		padding: 0 8px;
	}
	.vs-icon{
		margin-left: auto;
		font-weight: normal;
	}
	.vs-icon .vs-icon-link{
		color: rgba(255,255,255,0.5);
	}
	.vs-icon .vs-icon-link:hover{
		color: rgba(255,255,255,0.85);
	}

	.bt3740 {
		display: inline-block;
	}

	.bt3695 {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		position: fixed;
		background: rgba(25, 33, 43, 0.8);
		align-items: flex-start;
		justify-content: center;
	}

	.bt3696 {
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 99998;
		position: fixed;
		max-width: 840px;
		align-items: flex-start;
		justify-content: center;
	}

	.bt3697 {
		color: #ffffff;
		width: 496px;
		display: flex;
		padding: 32px 16px 40px;
		position: relative;
		background: #19212b;
		box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
		box-sizing: border-box;
		margin-top: 40px;
		align-items: center;
		font-weight: 500;
		border-radius: 6px;
		margin-bottom: 40px;
		flex-direction: column;
	}

	.bt3698 {
		top: 34px;
		right: 34px;
		display: block;
		opacity: 0.6;
		position: absolute;
	}

	.bt3699 {
		color: #ffffff;
		font-size: 22px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.bt3700 {
		padding: 0 30px;
		font-size: 14px;
		text-align: center;
		margin-bottom: 32px;
	}

	.bt3701 {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.bt3702 {
		margin: 8px;
	}

	.bt3703 {
		padding: 32px 8px 40px;
	}

	.bt3769 {
		width: 24px;
		height: 24px;
		position: relative;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}

	.bt3769::before {
		top: 7px;
		right: 11px;
		width: 2px;
		height: 10px;
		content: "";
		display: block;
		z-index: 2;
		position: absolute;
		font-size: 0;
		background: #ffffff;
	}

	.bt3769::after {
		top: 11px;
		right: 7px;
		width: 10px;
		height: 2px;
		content: "";
		display: block;
		z-index: 2;
		position: absolute;
		font-size: 0;
		background: #ffffff;
	}

	.bt3770 {
		background: rgba(255, 255, 255, 0.1);
	}

	.bt3770::before {
		transform: rotate(90deg);
		background: #ffffff;
	}

	.bt3770::after {
		background: #ffffff;
	}

	.bt4507 {
		width: 48px;
		border: 1px solid transparent;
		cursor: pointer;
		height: 24px;
		display: inline-block;
		z-index: 1;
		position: relative;
		background: rgba(255, 255, 255, 0.15);
		box-sizing: border-box;
		transition: background .3s;
		border-radius: 60px;
	}

	.bt4508 {
		background: #3a07f2;
	}

	.bt4509 {
		width: 44px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 6px;
	}

	.bt4511 {
		top: 2px;
		left: 3px;
		width: 18px;
		height: 18px;
		display: flex;
		z-index: 2;
		position: absolute;
		background: #ffffff;
		transition: transform .3s;
		align-items: center;
		border-radius: 50%;
		justify-content: center;
	}

	.bt4512 {
		transform: translateX(22px);
		background: #ffffff;
	}

	.bt-theme-editor__elements * {
		pointer-events: none;
	}

	.bt-theme-editor__elements *[data-editor-id] {
		cursor: pointer;
		pointer-events: auto;
	}

	.bt3693 {
		width: 100%;
		display: flex;
		position: relative;
		font-weight: 400;
		flex-direction: column;
	}

	.bt3694 {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
	}

	.simplebar-track.simplebar-vertical {
		width: 8px;
	}

	@media (hover: hover) {
		.bt3736:hover {
			cursor: pointer;
		}
	}

	.bt7035 {
		top: 0;
		color: #fa305c;
		right: 3px;
		width: 20px;
		height: 20px;
		display: flex;
		z-index: 2;
		position: absolute;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #fff;
	}

	.bt3745 {
		top: 0;
		left: 50%;
		z-index: 1;
		position: absolute;
	}

	.bt3746 {
		transform: scale(0);
	}

	.bt3747 {
		animation: bt3751 .4s linear forwards;
	}

	.bt3748 {
		transform: scale(1);
	}

	.bt3749 {
		transform: scale(0);
		transition: transform .2s ease-in-out;
	}

	.bt3750 {
		fill: currentColor;
		width: 10px;
		height: 10px;
	}

	@-webkit-keyframes bt3751 {
		40% {
			transform: scale(1.2);
		}

		60% {
			transform: scale(1.2);
		}

		80% {
			transform: scale(0.9);
		}

		100% {
			transform: scale(1);
		}
	}

	.bt4000 {
		display: inline-block;
		position: relative;
	}

	.bt4001 {
		width: 100%;
		height: 100%;
		display: block;
	}

	.bt4002 {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
	}

	.bt6262 {
		cursor: pointer;
		height: 40px;
		display: inline-flex;
		padding: 0 16px;
		position: relative;
		font-size: 14px;
		box-sizing: border-box;
		transition: background 0.5s, opacity 0.5s, color 0.5s;
		align-items: center;
		line-height: 40px;
		user-select: none;
		border-radius: 20px;
		vertical-align: middle;
	}

	.bt6263 .bt6272 {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bt6264 {
		padding-right: 8px;
	}

	.bt6265 {
		padding: 0;
		overflow: hidden;
		max-width: 256px;
		padding-left: 16px;
		padding-right: 16px;
	}

	.bt6265 .bt6271 {
		display: inline-block;
		opacity: 0;
	}

	.bt6265 .bt6272 {
		top: 0;
		left: 0;
		position: absolute;
		transition: transform 2s;
	}

	.bt6266 .bt6274 {
		background: rgba(13, 19, 28, 0.3);
	}

	.bt6266 .bt6269 {
		color: #ffffff;
	}

	.bt6266:hover .bt6269 {
		color: #ffffff;
	}

	.bt6267 {
		height: 32px;
		font-size: 12px;
		line-height: 32px;
	}

	.bt6268 {
		cursor: default;
		opacity: 0.3;
	}

	.bt6269 {
		flex: 0 0 auto;
		color: #ffffff;
		height: 24px;
		display: flex;
		z-index: 2;
		align-items: center;
		line-height: 1;
		padding-left: 5px;
		border-radius: 20px 0 0 20px;
		padding-right: 5px;
	}

	.bt6270 {
		flex: 1;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.bt6271 {
		display: none;
	}

	.bt6272 {
		width: 100%;
		display: inline-block;
		z-index: 1;
		white-space: nowrap;
	}

	.bt6273 {
		display: flex;
		align-items: center;
		padding-left: 0;
	}

	.bt6274 {
		color: #ffffff;
		padding: 2px 6px;
		font-size: 10px;
		background: #0d131c;
		line-height: 13px;
		margin-left: 4px;
		border-radius: 8px;
	}

	.bt6275 {
		margin-left: 4px;
		margin-right: 4px;
	}

	.bt7778 {
		color: #ffffff;
		font-size: 12px;
		background: #111923;
		font-weight: 700;
	}

	.bt7779 {
		color: #ffffff;
		background: #3a07f2;
	}

	.bt7780 {
		cursor: default;
		opacity: 0.3;
	}

	@media (hover: hover) {
		.bt7778:not(.bt7780):not(.bt7779):hover {
			box-shadow: none;
		}

		.bt7778:not(.bt7779):hover {
			background: rgba(17, 25, 35, 0.5);
		}

		.bt7779:hover {
			color: #ffffff !important;
			box-shadow: none;
		}
	}

	.bt6929 {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.bt6930 {
		display: inline-block;
		white-space: nowrap;
		vertical-align: top;
	}

	.bt6931 {
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		padding-bottom: 50px;
	}

	.bt6931::-webkit-scrollbar {
		display: none;
	}

	.bt4255 {
		color: inherit;
		display: flex;
		transition: all 0.3s;
		align-items: center;
		justify-content: center;
	}

	.bt4255 svg {
		fill: currentColor;
	}

	.bt7782 {
		display: inline-flex;
		line-height: initial;
		margin-right: 8px;
	}

	.bt7782:last-of-type {
		margin-right: 40px;
	}

	.bt7766 {
		width: 100%;
		position: relative;
	}

	.bt7767 {
		display: block;
	}

	.bt7768 {
		flex-direction: column;
	}

	.bt7769 {
		width: max-content;
		display: flex;
		box-sizing: border-box;
		white-space: nowrap;
		margin-bottom: 8px;
	}

	.bt7770 {
		position: absolute;
		flex-wrap: nowrap;
		visibility: hidden;
	}

	.bt7771 {
		z-index: 3;
		position: sticky;
	}

	.bt7772 {
		z-index: 2;
	}

	.bt7773 {
		display: inline-flex;
	}

	.bt7774 {
		margin-right: 8px;
	}

	.bt7774:last-of-type {
		margin-right: 40px;
	}

	.bt7775 {
		opacity: 0.6;
		margin-left: 8px;
	}

	.bt7776 {
		margin-left: 8px;
		margin-right: -8px;
	}

	.bt7777 {
		width: 16px;
		height: 33px;
		overflow: hidden;
		position: absolute;
	}

	.bt7777 svg {
		top: -7px;
		fill: #0d131c;
		left: -45px;
		position: absolute;
	}

	.bt4250 {
		position: relative;
		font-size: 12px;
	}

	.bt4251 {
		color: #ffffff;
		width: 100%;
		cursor: pointer;
		height: 32px;
		display: flex;
		padding: 0 12px 0 16px;
		position: relative;
		background: #111923;
		box-sizing: border-box;
		align-items: center;
		font-weight: 600;
		line-height: 32px;
		user-select: none;
		border-radius: 16px;
		justify-content: space-between;
	}

	.bt4252 {
		box-shadow: none;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.bt4252:before {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		content: "";
		z-index: -1;
		position: absolute;
		box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
		border-radius: inherit;
	}

	.bt4253 {
		top: 32px;
		left: 0;
		color: #ffffff;
		width: 100%;
		padding: 0px 16px 8px;
		position: absolute;
		background: #111923;
		box-sizing: border-box;
		border-radius: 16px;
		margin-bottom: 8px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.bt4253:before {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		content: "";
		z-index: -1;
		position: absolute;
		box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
		border-radius: inherit;
	}

	.bt4254 {
		color: inherit;
		padding: 8px 0;
		font-size: 12px;
		font-weight: 600;
		user-select: none;
		text-transform: capitalize;
	}

	@media (hover: hover) {
		.bt4254:hover {
			cursor: pointer;
		}
	}

	.bt4247 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
	}

	.bt4248 {
		color: #ffffff;
		opacity: 0.5;
		font-size: 12px;
		margin-top: 8px;
		font-weight: 600;
		margin-right: 8px;
		margin-bottom: 8px;
		letter-spacing: 3px;
		text-transform: uppercase;
	}

	.bt4249 {
		width: 168px;
		z-index: 2;
	}

	.bt4246 {
		margin: 40px auto 88px;
		max-width: 50%;
	}

	@media (max-width: 600px) {
		.bt4246 {
			padding: 0 16px;
			max-width: 100%;
			box-sizing: border-box;
		}
	}

	.bt4243 {
		max-width: 100%;
	}

	.bt4243 .bt4244 {
		padding: 0 16px;
	}

	.bt4244 {
		color: #ffffff;
		opacity: 0.5;
		font-size: 12px;
		margin-top: 32px;
		text-align: center;
		font-weight: 500;
		line-height: 18px;
	}

	.bt4245 {
		display: inline-block;
	}

	.bt6558 {
		display: inline-block;
		margin-right: 4px;
	}

	.bt6559 {
		color: inherit;
		display: block;
	}

	.bt6561 {
		margin: 0 2px;
		opacity: 0.5;
		transform: rotate(-90deg);
	}

	.bt6545 {
		display: inline-block;
	}

	.bt6542 {
		color: #ffffff !important;
		opacity: 0.5;
	}

	.bt6543 {
		color: inherit !important;
		opacity: 0.5;
	}

	.bt7174 {
		color: inherit;
		cursor: pointer;
		display: block;
		opacity: 0.4;
		outline: none;
		transition: opacity .3s ease-in-out;
		text-decoration: none;
	}

	@media (hover: hover) {
		.bt7174:hover {
			opacity: 1;
		}
	}

	.bt7175 {
		display: block;
	}

	.bt6958 {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 2;
		position: absolute;
		background: #3a07f2;
		align-items: center;
		justify-content: center;
	}

	.bt6959 {
		width: 14px;
		border: 2px solid rgba(255, 255, 255, 1);
		height: 14px;
		animation: bt6960 1s linear infinite;
		border-top: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}

	@-webkit-keyframes bt6960 {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.bt6961 {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.bt6962 {
		right: 2px;
		width: 0;
		bottom: 2px;
		height: 0;
		position: absolute;
		border-color: transparent transparent #fa305c transparent;
		border-style: solid;
		border-width: 0 0 8px 8px;
		animation-name: bt6964;
		animation-duration: 2s;
	}

	.bt6963 {
		top: 2px;
		right: 2px;
		width: 0;
		height: 0;
		position: absolute;
		border-color: transparent #2ddc4b transparent transparent;
		border-style: solid;
		border-width: 0 8px 8px 0;
		animation-name: bt6964;
		animation-duration: 2s;
	}

	@-webkit-keyframes bt6964 {
		16% {
			opacity: 1;
		}

		32% {
			opacity: 0;
		}

		48% {
			opacity: 1;
		}

		64% {
			opacity: 0;
		}

		80% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.bt6965 {
		height: 1.2em;
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}

	.bt6966 .bt6968 {
		transform: translateY(110%);
	}

	.bt6966 .bt6969 {
		transform: translateY(0);
	}

	.bt6966 .bt6970 {
		transform: translateY(-100%);
	}

	.bt6966 .bt6971 {
		transform: translateY(-210%);
	}

	.bt6968 {
		transform: translateY(-110%);
	}

	.bt6969 {
		transform: translateY(0);
		transition: transform 400ms ease-in-out;
	}

	.bt6970 {
		transform: translateY(-100%);
	}

	.bt6971 {
		transform: translateY(10%);
		transition: transform 400ms ease-in-out;
	}

	.bt7193 {
		color: #ffffff;
		border: 1px solid;
		cursor: pointer;
		height: 48px;
		display: flex;
		padding: 1.5px;
		overflow: hidden;
		position: relative;
		min-width: 72px;
		background: #19212b;
		box-sizing: border-box;
		transition: all 0.2s ease-in-out;
		font-weight: 600;
		border-color: #19212b;
		border-radius: 8px;
		flex-direction: column;
		justify-content: center;
	}

	.bt7194 {
		color: rgba(255, 255, 255, 1);
		cursor: default;
		opacity: 0.3;
		background: rgba(25, 33, 43, 1);
		border-color: rgba(25, 33, 43, 1);
	}

	.bt7194 .bt7196 {
		color: rgba(255, 255, 255, 1);
	}

	.bt7195 {
		color: #ffffff;
		background: #3a07f2;
		border-color: #3a07f2;
	}

	.bt7195 .bt7196 {
		color: #ffffff;
	}

	.bt7196 {
		flex: 0 0 auto;
		color: #ffffff;
		display: flex;
		opacity: 0.5;
		overflow: hidden;
		font-size: 12px;
		max-width: 100%;
		box-sizing: border-box;
		text-align: center;
		word-break: break-all;
		font-weight: 600;
		white-space: nowrap;
		margin-bottom: 9px;
		justify-content: center;
	}

	.bt7197 {
		flex: none;
		font-size: 12px;
		align-self: center;
		text-align: center;
		line-height: 15px;
	}

	.bt7198 {
		margin-right: 4px;
	}

	.bt7199 {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		position: absolute;
		background: #3a07f2;
	}

	@media (hover: hover) {
		.bt7193:hover {
			color: #ffffff;
			background: rgba(25, 33, 43, 0.7);
			border-color: rgba(25, 33, 43, 0.7);
		}

		.bt7193:hover .bt7196 {
			color: #ffffff;
		}

		.bt7194:hover {
			color: rgba(255, 255, 255, 1);
			background: rgba(25, 33, 43, 1);
			border-color: rgba(25, 33, 43, 1);
		}

		.bt7194:hover .bt7196 {
			color: rgba(255, 255, 255, 1);
		}

		.bt7195:hover {
			color: #ffffff;
			background: rgba(34, 131, 246, 0.75);
			border-color: rgba(34, 131, 246, 0.75);
		}

		.bt7195:hover .bt7196 {
			color: #ffffff;
		}
	}

	.bt7190 {
		color: #ffffff;
		margin: 0;
		z-index: 4;
		position: relative;
		box-sizing: border-box;
		text-align: center;
		font-weight: 600;
	}

	.bt7191 {
		color: #ffffff;
		width: 100%;
		height: 16px;
		opacity: 0.5;
		overflow: hidden;
		font-size: 12px;
		box-sizing: border-box;
		line-height: 16px;
		border-radius: 2px;
		-webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
	}

	.bt7192 {
		cursor: pointer;
		display: inline;
	}

	.bt7186 {
		width: auto;
		display: flex;
		position: relative;
		margin-top: 0;
		margin-right: 10px;
		flex-direction: column;
		justify-content: space-between;
	}

	.bt7188 {
		display: flex;
		flex-wrap: nowrap;
	}

	.bt7189 {
		margin-right: 4px;
		border-radius: 0;
	}

	.bt7189:first-of-type {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.bt7189:last-of-type {
		margin-right: 0;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.bt7179 {
		height: 100%;
		display: flex;
		align-items: flex-end;
	}

	.bt7180 {
		display: flex;
	}

	.bt7181 {
		flex: 1;
		height: 100%;
		position: relative;
	}

	.bt7181::after {
		top: 0;
		right: -1px;
		width: 40px;
		height: 100%;
		content: "";
		position: absolute;
		background: linear-gradient(to left,
				rgba(17, 25, 35, 1),
				rgba(17, 25, 35, 0));
	}

	.bt7182 {
		display: flex;
		align-items: flex-end;
	}

	.bt7183 {
		width: 100%;
		height: 48px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.bt7184 {
		color: rgba(255, 255, 255, 0.5);
		width: 100%;
		height: 48px;
		display: flex;
		font-size: 12px;
		background: rgba(25, 33, 43, 1);
		align-items: center;
		border-radius: 6px;
		justify-content: center;
	}

	.bt7185 {
		color: #ffffff;
		cursor: pointer;
		background: #19212b;
		transition: all 0.2s ease-in-out;
		font-weight: 600;
		text-decoration: none;
	}

	@media (hover: hover) {
		.bt7185:hover {
			color: #ffffff;
			background: rgba(25, 33, 43, 0.7);
			border-color: rgba(25, 33, 43, 0.7);
		}
	}

	.bt6547 {
		cursor: pointer;
		display: block;
		vertical-align: middle;
	}

	.bt6547 svg {
		display: block;
		opacity: 0.4;
		transition: opacity 0.3s;
	}

	.bt6547.bt6548 svg {
		opacity: 1;
	}

	.bt6549 {
		opacity: 0.4;
	}

	.bt6550 {
		opacity: 1;
		animation: bt6554 0.55s linear both;
	}

	.bt6551 {
		cursor: default;
		opacity: 0.3;
	}

	.bt6552 {
		opacity: 1;
	}

	.bt6553 {
		opacity: 0.4;
		animation: bt6555 0.55s linear both;
	}

	@media (hover: hover) {
		.bt6547:not(.bt6551):hover svg {
			opacity: 1;
		}
	}

	@-webkit-keyframes bt6554 {
		0% {
			transform: scale(1);
		}

		35% {
			transform: scale(1.3);
		}

		60% {
			transform: scale(1.4);
		}

		90% {
			transform: scale(0.9);
		}

		100% {
			transform: scale(1);
		}
	}

	@-webkit-keyframes bt6555 {
		0% {
			transform: scale(1);
		}

		35% {
			transform: scale(0.7);
		}

		50% {
			transform: scale(0.6);
		}

		65% {
			transform: scale(0.7);
		}

		100% {
			transform: scale(1);
		}
	}

	.bt7298 {
		flex: 0 0 auto;
		color: inherit;
		display: flex;
		min-width: 32px;
		box-sizing: border-box;
		justify-content: center;
	}

	.bt7299 .bt7301 {
		width: auto;
		border: none;
		padding: 0;
		font-size: 16px;
		background: none;
		line-height: 24px;
	}

	.bt7300 {
		flex: 1;
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		justify-content: space-between;
	}

	.bt7300 span {
		flex: 1;
		opacity: 1;
	}

	.bt7302 {
		margin-bottom: 8px;
	}

	.bt7304 {
		margin: 0 4px;
	}

	.bt7305 {
		font-size: 16px;
		font-weight: 600;
		flex-direction: row;
	}

	.bt7305 .bt7302 {
		margin-bottom: 0;
	}

	.bt6566 {
		color: rgba(255, 255, 255, 0.3);
	}

	.bt7173 {
		display: inline-block;
	}

	.bt7169 {
		margin: 0 0 0 4px;
		display: flex;
		min-width: 0;
		align-items: center;
		justify-content: flex-end;
	}

	.bt7170 {
		overflow: hidden;
		font-size: 11px;
		min-height: 14px;
		align-items: center;
		margin-left: 8px;
		text-overflow: ellipsis;
	}

	.bt7171:not(:empty) {
		display: inline-flex;
		font-size: 0;
		min-height: 14px;
		align-items: center;
		line-height: 0;
		margin-left: 8px;
		vertical-align: middle;
	}

	.bt7144 {
		color: #ffffff;
		width: 100%;
		border: 1px solid transparent;
		display: flex;
		opacity: 1;
		padding: 8px;
		direction: ltr;
		background: #111923;
		box-sizing: border-box;
		transition: background 0.5s;
		border-color: #111923;
		border-radius: 8px;
	}

	.bt7145 {
		flex: 1;
		display: flex;
		padding: 0 8px;
		justify-content: space-between;
	}

	.bt7146 {
		font-size: 14px;
		font-weight: 600;
		line-height: 21px;
		letter-spacing: 0.4px;
	}

	.bt7147 {
		font-size: 11px;
		text-align: center;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0.2px;
	}

	.bt7148 {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
	}

	.bt7149 {
		width: 24px;
		height: 24px;
		display: block;
		position: absolute;
		margin-right: 8px;
		vertical-align: middle;
	}

	.bt7150 {
		width: 100%;
		height: 24px;
		display: inline-block;
		overflow: hidden;
		position: relative;
		font-size: 12px;
		box-sizing: border-box;
		word-break: break-all;
		font-weight: 600;
		line-height: 24px;
		padding-left: 32px;
		vertical-align: middle;
	}

	.bt7151 {
		color: rgba(255, 255, 255, 0.5);
		height: 24px;
		margin: 0 8px;
		font-size: 14px;
		line-height: 24px;
	}

	.bt7152 {
		flex-wrap: wrap;
	}

	.bt7152 .bt7154 {
		width: 100%;
	}

	.bt7152 .bt7159 {
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-left: none;
		padding-top: 8px;
		padding-left: 0;
	}

	.bt7152 .bt7164 .bt7165 {
		padding-right: 0;
	}

	.bt7152 .bt7164 .bt7158 {
		padding-right: 0;
	}

	.bt7153 {
		flex-direction: column;
	}

	.bt7153 .bt7154 {
		width: 100%;
		align-items: flex-end;
	}

	.bt7153 .bt7159 {
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-left: none;
		padding-top: 5px;
		padding-left: 0;
	}

	.bt7153 .bt7164 .bt7165 {
		padding-right: 0;
	}

	.bt7153 .bt7164 .bt7158 {
		padding-right: 0;
		flex-direction: column;
	}

	.bt7153 .bt7164 .bt7158::after {
		right: 24px;
		z-index: 2;
	}

	.bt7153 .bt7160 {
		margin-top: 8px;
	}

	.bt7153 .bt7161 {
		height: auto;
	}

	.bt7153 .bt7162 {
		flex: 0 0 auto;
		order: 2;
		right: 0;
		width: auto;
		border: 0;
		bottom: 0;
		padding: 8px;
	}

	.bt7153 .bt7162 .bt7158 {
		justify-content: flex-end;
	}

	.bt7153 .bt7164 {
		flex: 1;
		order: 1;
		padding: 8px;
	}

	.bt7153 .bt7166 {
		height: auto;
		align-items: flex-start;
	}

	.bt7154 {
		width: 560px;
		cursor: pointer;
		display: flex;
		transition: background 0.5s;
		border-radius: 6px;
	}

	.bt7155 {
		flex: 1;
		overflow: hidden;
	}

	.bt7156 {
		font-size: 11px;
	}

	.bt7157 {
		font-size: 11px;
	}

	.bt7158 {
		display: flex;
		position: relative;
	}

	.bt7158 .bt7155 {
		z-index: 3;
	}

	.bt7159 {
		width: calc(100% - 560px - 8px);
		display: flex;
		min-height: 72px;
		align-items: flex-end;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		padding-left: 8px;
	}

	.bt7160 {
		display: flex;
		position: relative;
	}

	.bt7161 {
		height: 72px;
		display: flex;
		padding: 0 14px 8px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		flex-direction: column;
		justify-content: space-between;
	}

	.bt7161:last-of-type {
		border-right: none;
	}

	.bt7162 {
		flex: 0 0 72px;
		color: #ffffff;
		align-items: center;
		padding-left: 0;
		padding-right: 8px;
		justify-content: center;
	}

	.bt7162 .bt7165 {
		justify-content: center;
	}

	.bt7163 {
		justify-content: space-between;
	}

	.bt7164 {
		flex: 1;
		overflow: hidden;
		padding-right: 0;
	}

	.bt7164 .bt7165 {
		box-sizing: border-box;
		padding-right: 14px;
	}

	.bt7164 .bt7158 {
		box-sizing: border-box;
		padding-right: 14px;
	}

	.bt7164 .bt7158::after {
		top: 0;
		right: 0;
		width: 40px;
		height: 100%;
		content: "";
		display: block;
		position: absolute;
		background: linear-gradient(to left,
				rgba(17, 25, 35, 1),
				rgba(17, 25, 35, 0),
			);
	}

	.bt7165 {
		display: flex;
	}

	.bt7166 {
		height: 24px;
		display: flex;
		align-items: center;
	}

	.bt7167 {
		height: 62px;
		display: flex;
		font-size: 12px;
		text-align: center;
		align-items: center;
		font-weight: 600;
		line-height: 16px;
		justify-content: center;
	}

	.bt7168 {
		margin-right: 20px;
		vertical-align: bottom;
	}

	.bt7134 {
		width: calc(100% + 16px);
		display: flex;
		margin-left: -16px;
		margin-bottom: -16px;
		flex-direction: column;
	}

	.bt7134::after {
		clear: both;
		content: "";
		display: block;
	}

	.bt7135 {
		margin-bottom: 0;
	}

	.bt7136 {
		position: relative;
	}

	.bt7136::before {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		display: block;
		z-index: 2;
		position: absolute;
	}

	.bt7137 {
		display: block;
	}

	.bt7138 {
		width: 100%;
	}

	.bt7138:last-of-type {
		margin-bottom: 0;
	}

	.bt7139 {
		color: #fff;
		float: left;
		width: 100%;
		box-sizing: border-box;
		padding-left: 16px;
		margin-bottom: 16px;
	}

	.bt7140 {
		width: 50%;
	}

	.bt7141 {
		width: 33.333%;
	}

	.bt7142 {
		width: 25%;
	}

	.bt7143 {
		float: right;
		order: 6;
		height: 644px;
		display: flex;
		justify-content: center;
	}

	.bt7088 {
		cursor: pointer;
	}

	.bt7088 .bt7091 path {
		fill: #ffffff;
	}

	.bt7089 {
		transition: opacity 0.3s;
	}

	.bt7090 {
		height: 26px;
		display: flex;
		align-items: center;
		margin-right: 8px;
		justify-content: center;
	}

	.bt7091 {
		height: 26px;
		opacity: 0.5;
		margin-left: 4px;
	}

	@media (hover: hover) {
		.bt7088:hover .bt7089 {
			opacity: 0.5;
		}
	}

	.bt7130 {
		display: flex;
		margin-left: -16px;
		flex-direction: column;
	}

	.bt7130::after {
		clear: both;
		content: "";
		display: block;
	}

	.bt7131 {
		color: #fff;
		float: left;
		width: 100%;
		height: 200px;
		box-sizing: border-box;
		padding-left: 16px;
		margin-bottom: 16px;
	}

	.bt7132 {
		display: flex;
		margin-top: 16px;
		justify-content: center;
	}

	.bt7133 {
		width: 100%;
		max-width: 213px;
	}

	.bt7082 {
		color: #ffffff;
		font-size: 22px;
		font-weight: 600;
		line-height: 27px;
		margin-bottom: 16px;
	}

	.bt7083 {
		display: flex;
		align-items: center;
	}

	.bt7084 {
		cursor: pointer;
	}

	.bt7786 {
		margin-top: 24px;
	}

	.bt7845 {
		color: #ffffff;
		border: 1px solid transparent;
		cursor: pointer;
		display: flex;
		opacity: 1;
		padding: 16px;
		background: #111923;
		box-sizing: border-box;
		min-height: 204px;
		transition: opacity 0.5s;
		align-items: center;
		border-color: #111923;
		border-radius: 6px;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
	}

	.bt7846 {
		margin-bottom: 24px;
	}

	.bt7847 {
		padding: 24px 0;
		min-height: auto;
		flex-direction: row;
	}

	.bt7847 .bt7846 {
		flex: 0 0 auto;
		margin: 0;
	}

	.bt7847 .bt7848 {
		flex: 0 0 auto;
		margin: 0 24px;
	}

	.bt7847 .bt7849 {
		flex: 0 0 auto;
	}

	.bt7848 {
		color: #ffffff;
		margin: 0 0 24px;
		font-size: 24px;
		text-align: center;
		font-weight: 300;
		line-height: 40px;
		text-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.2);
	}

	.bt7849 {
		color: #ffffff;
		height: 32px;
		display: inline-block;
		padding: 0 40px;
		font-size: 12px;
		background: #3a07f2;
		font-weight: bold;
		line-height: 32px;
		border-color: #3a07f2;
		border-radius: 24px;
		text-transform: uppercase;
	}

	@media (hover: hover) {
		.bt7849:hover {
			opacity: 0.75;
		}
	}

	.bt7072 {
		display: flex;
		align-items: center;
	}

	.bt7073 {
		flex: 0 0 auto;
		height: 152px;
		overflow: hidden;
		box-sizing: content-box;
		padding-right: 16px;
	}

	.bt7073:last-of-type {
		padding-right: 0;
	}

	.bt7074 {
		height: 152px;
		display: flex;
		align-items: center;
	}

	.bt7075 {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 8px;
	}

	.bt7075 img {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 8px;
	}

	.bt6234 {
		width: 100%;
		padding: 16px;
		position: relative;
		box-sizing: border-box;
	}

	.bt7030 {
		color: #ffffff;
		padding: 8px;
		position: relative;
		font-size: 14px;
		background: #111923;
		transition: background 0.5s;
		font-weight: 600;
		border-radius: 6px;
		margin-bottom: 8px;
	}

	.bt7031 {
		color: #ffffff;
		background: #19212B;
		margin-bottom: 8px;
	}

	.bt7032 {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.bt7033 {
		color: #3a07f2;
	}

	.bt7034 {
		top: 12px;
		right: 8px;
		cursor: pointer;
		position: absolute;
	}

	.bt7027 {
		margin-left: 8px;
	}

	.bt7028 {
		height: 0;
		overflow: hidden;
	}

	.bt7029 {
		height: auto;
		padding-top: 8px;
	}

	.bt3733 {
		width: 100%;
		display: flex;
		position: relative;
		background: #111923;
		box-shadow: none;
		box-sizing: border-box;
		align-items: center;
		padding-left: 8px;
		padding-right: 8px;
		justify-content: space-between;
	}

	.bt3735 {
		transform: rotate(180deg);
		margin-right: 8px;
	}

	.bt7025 {
		color: #ffffff;
		cursor: pointer;
		display: flex;
		padding: 8px;
		font-size: 12px;
		background: #19212b;
		box-sizing: border-box;
		margin-top: 8px;
		transition: opacity 0.5s;
		align-items: center;
		font-weight: 600;
		line-height: 14px;
		border-radius: 6px;
	}

	@media (hover: hover) {
		.bt7025:hover {
			opacity: 0.5;
		}
	}

	.bt7026 {
		color: #ffffff;
		background: #3a07f2;
	}

	.bt7024 {
		margin-right: 8px;
	}

	.bt7019 {
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		height: 40px;
		display: flex;
		position: relative;
		font-size: 11px;
		align-items: center;
		font-weight: 600;
		line-height: 13px;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}

	.bt7020 {
		margin-right: 10px;
	}

	.bt7021 {
		top: 8px;
		right: 0;
		z-index: 2;
		position: absolute;
	}

	.bt7023 {
		height: 0;
		overflow: hidden;
	}

	.bt3771 {
		color: rgba(255, 255, 255, 0.5);
		height: 88px;
		display: flex;
		padding: 0 16px;
		background: #19212b;
		box-sizing: border-box;
		align-items: center;
		border-radius: 6px;
	}

	.bt3772 {
		padding: 0 8px 0 24px;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.4px;
		vertical-align: middle;
	}

	.bt3773 {
		margin-left: 4px;
		vertical-align: middle;
	}

	.bt3774 {
		flex: none;
	}

	.bt3763 {
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		height: 40px;
		display: flex;
		position: relative;
		font-size: 11px;
		align-items: center;
		font-weight: 600;
		line-height: 13px;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}

	.bt3764 {
		margin-right: 10px;
	}

	.bt3765 {
		top: 8px;
		right: 0;
		z-index: 2;
		position: absolute;
	}

	.bt3767 {
		height: 0;
		overflow: hidden;
	}

	.bt3768 {
		margin-bottom: 8px;
	}

	.bt3768:last-of-type {
		margin-bottom: 0;
	}

	.bt3724 {
		color: #ffffff;
		width: 320px;
		height: 100%;
		position: relative;
		background: #111923;
		box-shadow: none;
		border-color: #111923;
	}

	.bt3725 {
		height: 64px;
		display: flex;
		background: #111923;
		align-items: center;
		justify-content: space-between;
	}

	.bt3726 {
		padding: 0 16px;
		margin-bottom: 8px;
	}

	.bt3727 {
		padding: 0 8px;
	}

	.bt3727 .bt3729 {
		padding: 0 8px;
	}

	.bt3728 {
		padding: 0 8px;
		margin-top: 8px;
	}

	.bt3729 {
		color: rgba(255, 255, 255, 0.5);
		height: 40px;
		display: flex;
		position: relative;
		font-size: 11px;
		align-items: center;
		font-weight: 600;
		line-height: 13px;
		margin-bottom: 8px;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}

	.bt3730 {
		margin-right: 10px;
	}

	.bt3731 {
		vertical-align: text-top;
	}

	.bt3732 {
		width: 100%;
		height: auto;
		background-color: transparent;
	}

	.bt5136 {
		flex: 1;
		position: relative;
	}


	.bt5389 {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bt5390 {
		min-width: 48px;
		margin-right: 16px;
	}

	.bt5391 {
		display: flex;
		flex-direction: column;
	}

	.bt5392 {
		font-size: 14px;
		font-weight: 600;
		line-height: 18px;
	}

	.bt5393 {
		font-size: 12px;
		margin-top: 8px;
		font-weight: 600;
		line-height: 16px;
	}

	.bt5225 {
		position: relative;
	}

	.bt5226 .bt5227 {
		padding: 16px 16px 0px;
	}

	.bt5226 .bt5236 {
		margin-top: 0;
	}

	.bt5227 {
		padding: 16px 8px 0px;
	}

	.bt5228 {
		padding: 16px;
	}

	.bt5229 {
		margin: 8px 4px 2px 4px;
	}

	.bt5230 {
		margin: 0;
	}

	.bt5231 {
		transform: translateY(0);
		transition: transform .3s;
	}

	.bt5232 {
		transform: translateY(0);
	}

	.bt5233 {
		transform: translateY(15px);
		transition: transform .2s;
	}

	.bt5234 {
		margin-bottom: 16px;
	}

	.bt5235 {
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		padding: 0 0 12px;
		z-index: 3;
		position: absolute;
		box-sizing: border-box;
	}

	.bt5236 {
		margin-top: 8px;
	}

	.bt5112 {
		display: flex;
		flex-direction: column;
	}

	.bt5113 {
		display: flex;
		overflow: auto;
		flex-direction: column;
		-webkit-overflow-scrolling: touch;
	}

	.bt5113::-webkit-scrollbar {
		width: 8px;
		background-color: rgba(0, 0, 0, 0.15);
		-webkit-border-radius: 100px;
	}

	.bt5113::-webkit-scrollbar-thumb:vertical {
		background: rgba(255, 255, 255, 0.15);
		-webkit-border-radius: 100px;
	}

	.bt5113::-webkit-scrollbar-thumb:vertical:active {
		background: rgba(255, 255, 255, 0.15);
		-webkit-border-radius: 100px;
	}

	.bt5113::-webkit-scrollbar:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}

	.bt5114 {
		flex: 1;
		display: flex;
		position: relative;
		min-height: 105px;
		flex-direction: column;
	}

	.bt5115 {
		min-height: 169px;
	}

	.bt5116 {
		display: flex;
		overflow: hidden;
		max-height: 105px;
		flex-direction: column;
	}

	.bt5116.bt5115 {
		max-height: initial;
	}

	.bt5117 {
		transform: translateY(-100%);
		will-change: transform;
	}

	.bt5118 {
		transform: translateY(0);
		transition: transform .3s ease-in-out;
	}

	.bt5119 {
		transform: translateY(0);
	}

	.bt5120 {
		transform: translateY(-100%);
		transition: transform .2s ease-in-out;
	}

	.bt5121 {
		top: 0;
		position: absolute;
		min-width: 100%;
	}

	.bt5122 {
		opacity: 0;
		pointer-events: none;
	}

	.bt5123 {
		opacity: 1;
		transition: opacity .3s linear;
		pointer-events: auto;
	}

	.bt5124 {
		opacity: 1;
		pointer-events: auto;
	}

	.bt5125 {
		opacity: 0;
		transition: opacity .2s linear;
		pointer-events: none;
	}

	.bt5126 {
		flex: 1;
		z-index: 1;
	}

	.bt4514 {
		overflow: hidden;
		position: relative;
	}

	.bt4515 {
		overflow: auto;
		overflow-x: hidden;
	}

	.bt4516 {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 4;
		position: absolute;
	}

	.bt3718 {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}

	.bt3719 {
		flex: 1;
		width: 100%;
		display: flex;
		position: relative;
		box-sizing: border-box;
	}

	.bt3720 {
		width: 320px;
	}

	.bt3721 {
		width: calc(100% - 320px);
		position: relative;
		box-sizing: border-box;
	}

	.bt3722 .bt3719 {
		flex-direction: column;
	}

	.bt3722 .bt3720 {
		flex: 0 0 auto;
		width: 100%;
	}

	.bt3722 .bt3721 {
		flex: 1;
		width: 100%;
		overflow: visible;
	}

	.bt3723 {
		box-sizing: border-box;
		margin-bottom: 16px;
	}

	.bt4513 {
		width: 32px;
		height: 32px;
	}

	.bt4501 {
		display: flex;
		flex-basis: 126px;
		align-items: center;
		justify-content: center;
	}

	.bt4502 {
		flex: none;
		width: 52px;
		border: 2px solid;
		background: rgba(0, 0, 0, 0);
		border-color: #ffffff;
	}

	.bt4503 {
		background: #ffffff;
		border-color: transparent;
	}

	.bt4503 .bt4504 {
		color: #ffffff;
		transform: translateX(28px);
		background: #fa305c;
	}

	.bt4504 {
		top: 1px;
		left: 1px;
		color: #3a07f2;
		background: #ffffff;
	}

	.bt4505 {
		color: #ffffff;
		font-size: 10px !important;
		text-align: right;
		font-weight: 700;
		line-height: 12px;
		margin-right: 8px;
		text-transform: uppercase;
	}

	.bt4506 {
		color: #ffffff;
	}

	.bt4485 {
		overflow: hidden;
		font-size: 16px !important;
		text-overflow: ellipsis;
	}

	.bt4486 {
		fill: currentColor;
		flex: none;
		width: 16px;
		cursor: pointer;
		height: 16px;
		opacity: 0.5;
		margin-left: 4px;
	}

	.bt4487 {
		transform: rotate(180deg);
	}

	.bt4488 {
		flex: none;
		margin-right: 4px;
	}

	.bt4489 {
		top: 0;
		flex: none;
		left: 0;
		color: #3a07f2;
		width: 20px;
		height: 20px;
		display: flex;
		position: relative;
		font-size: 14px;
		transform: scale(0);
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
		text-align: center;
		align-items: center;
		font-weight: 600;
		line-height: 20px;
		margin-left: 8px;
		border-radius: 50%;
		justify-content: center;
	}

	.bt4489:after {
		top: 0;
		width: 100%;
		height: 100%;
		content: "";
		display: block;
		position: absolute;
		background: #ffffff;
		border-radius: 50%;
	}

	.bt4490 {
		animation: bt4493 .6s ease-in-out forwards;
	}

	.bt4491 {
		transform: scale(1);
	}

	.bt4492 {
		transform: scale(0);
		transition: transform .2s ease-in-out;
	}

	@-webkit-keyframes bt4493 {
		0% {
			transform: scale(0);
		}

		35% {
			transform: scale(1.2);
		}

		55% {
			transform: scale(1.3);
		}

		65% {
			transform: scale(1);
		}

		80% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(1);
		}
	}

	.bt4494 {
		display: flex;
		z-index: 1;
		align-items: center;
		justify-content: center;
	}

	.bt4495 {
		color: #ffffff;
		cursor: pointer;
		height: 56px;
		display: flex;
		padding: 0 16px;
		z-index: 1;
		position: relative;
		background: #3a07f2;
		box-sizing: border-box;
		align-items: center;
		border-radius: 6px 6px 0px 0px;
		justify-content: space-between;
	}

	.bt4495:before {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		content: "";
		opacity: 0;
		z-index: -1;
		position: absolute;
		background: linear-gradient(to right, #3a07f2, #fa305c);
		transition: opacity 300ms ease-in-out;
		border-radius: inherit;
	}

	.bt4496 {
		color: #ffffff;
	}

	.bt4496:before {
		opacity: 1;
	}

	.bt4497 {
		flex: 1;
		display: flex;
		font-size: 16px;
		min-width: 0;
		align-items: center;
		font-weight: 600;
	}

	.bt4498 {
		width: 20px;
		height: 20px;
		z-index: 1000;
		position: absolute;
		background: #ffffff;
		border-radius: 50%;
	}

	.bt4499 {
		width: 32px;
		height: 32px;
		margin-right: 8px;
	}

	.bt4476 {
		transition: all 300ms ease-in-out;
	}

	.bt4477 {
		opacity: 1;
		transform: translateY(0);
	}

	.bt4478 {
		opacity: 1;
		transform: translateY(0);
	}

	.bt4483 {
		transition: height 300ms ease-in-out;
		will-change: height;
	}

	.bt4484 {
		transition: none;
	}

	.spt-bet-slip {
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		position: fixed;
		pointer-events: none;
	}

	.bt-theme-editor__elements * {
		pointer-events: none;
	}

	.bt-theme-editor__elements *[data-editor-id] {
		cursor: pointer;
		pointer-events: auto;
	}

	.bt4460 {
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		position: absolute;
	}

	.bt4461 .bt4462 .bt4466 {
		background: #111923;
		border-radius: 16px 16px 0 0;
	}

	.bt4462 {
		width: 320px;
		bottom: -120px;
		margin: 0 4px;
		position: absolute;
	}

	.bt4463 {
		transform: translateY(-120px);
		transition: transform 300ms ease-in-out;
	}

	.bt4464 {
		transform: translateY(-120px);
	}

	.bt4465 {
		transform: translateY(0);
		transition: transform 300ms ease-in-out;
	}

	.bt4466 {
		left: 0;
		right: 0;
		bottom: 120px;
		position: absolute;
		background: #111923;
		box-shadow: 0 0 60px rgba(0, 0, 0, 0.65);
		text-shadow: none;
		border-radius: 6px 6px 0 0;
		pointer-events: auto;
	}

	.bt4467 {
		left: 50%;
		position: absolute;
		margin-left: -29px;
		pointer-events: auto;
	}

	.bt4468 {
		position: absolute;
		pointer-events: auto;
	}

	.bt4469 {
		left: 0;
		right: 0;
		bottom: 0;
		height: 120px;
		position: absolute;
		background: #19212b;
		pointer-events: auto;
	}

	@media (max-width: 600px) {
		.bt4462 {
			width: calc(100% - 8px);
			box-sizing: border-box;
		}

		.bt4461 .bt4462 {
			width: 100%;
			margin: 0;
		}
	}

	.bt4460 * {
		box-sizing: border-box;
		word-break: keep-all;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.bt3725{
		text-align:center;

	}
	.bt3725 .iconfont{
		cursor: pointer;
		font-size:22px!important;
	}
	.bt3725 .col{
		flex:1
	}
	.collapse-cells ::v-deep .el-collapse-item__header{
		background-color: transparent;
		color: #ffffff;
		cursor: pointer;
		border-bottom: 0;
		height: 32px;
		line-height: 32px;
	}
	.collapse-cells ::v-deep .el-collapse-item__content{
		padding-bottom: 0;
	}
	.collapse-cells ::v-deep .el-collapse-item__wrap{
		background-color: transparent;
		border-bottom: 0!important;
	}
	.collapse-cells ::v-deep .el-collapse{
		border-top: 0;
		border-bottom:0;
	}
	.collapse-top-cells{
		padding: 0 16px;
	}
	.collapse-top-cells .el-collapse-item{
		margin-bottom: 12px;
	}
	.bt7019 .iconfont{
		margin-right: 10px;
		font-weight:normal;
		font-size:12px;
	}
	.bt3730 .iconfont{
		font-weight:normal;
		font-size:12px;
	}
	.bt7025 .ico{
		margin-right: 10px;
	}
	.collapse-main-cells .collapse-list{
		margin-top: 8px;
	}
	.collapse-main-cells .el-collapse-item{
		color: #ffffff;
		padding: 8px;
		position: relative;
		font-size: 14px;
		background: #111923;
		transition: background 0.5s;
		font-weight: 600;
		border-radius: 6px;
		margin-bottom: 8px;
	}
	.collapse-main-cells .el-collapse-item.is-active{
		background: #19212B;
	}
	.bt99 {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.bt99 .iconfont{
		font-size:22px;
		margin-right: 10px;
	}
	.bt99 .tit{
		font-weight: 600;
	}
	.bt1387{
		color: #ffffff;
		cursor: pointer;
		display: flex;
		padding: 8px;
		font-size: 13px;
		border-top: 1px solid rgba(255,255,255,0.1);
		align-items: center;
		font-weight: 400;
	}
	.bt1387 span{
		font-size: 13px;
	}
	.bt1387 .ico{
		margin-right: 10px;
	}
	.bt1375 {
		color: rgba(255,255,255,0.5);
		height: 88px;
		display: flex;
		padding: 0 16px;
		background: #19212b;
		box-sizing: border-box;
		align-items: center;
		border-radius: 6px;
	}
	.bt1375 .iconfont{
		background-color: transparent;
		font-size: 40px;
	}
	.bt1376 {
		padding: 0 8px 0 24px;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.4px;
		vertical-align: middle;
	}
	.bt1377 {
		margin-left: 4px;
		vertical-align: middle;
	}
	.bt1378 {
		flex: none;
	}
	.bt1486 {
		color: #ffffff;
		border: 2px solid transparent;
		cursor: pointer;
		position: relative;
		background: #19212b;
		transition: all 0.5s;
		font-weight: 500;
		border-color: #19212b;
		border-radius: 6px;
		margin-top: 8px;
	}

	.bt1487 {
		margin-right: 8px;
	}

	.bt1488 {
		border-color: #3a07f2;
	}

	.bt1489 {
		display: flex;
	}

	.bt1490 {
		flex: 1;
		display: flex;
		padding: 1px 0 1px 8px;
		overflow: hidden;
		font-weight: inherit;
		flex-direction: column;
		justify-content: center;
	}

	.bt1491 {
		flex: 0 0 auto;
		display: flex;
		padding: 0 8px;
		box-sizing: border-box;
		text-align: right;
		flex-direction: column;
		justify-content: center;
	}

	.bt1492 {
		margin: 8px 0;
		font-size: 20px;
		text-align: right;
		line-height: 20px;
	}

	.bt1493 {
		margin: 8px 0;
		display: flex;
		overflow: hidden;
		font-size: 14px;
	}

	.bt1494 {
		color: #ffffff;
		display: flex;
		position: relative;
		box-sizing: border-box;
		padding-top: 4px;
		padding-left: 4px;
		border-bottom: 1px solid;
		padding-right: 4px;
		padding-bottom: 2px;
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}

	.bt1495 {
		color: #ffffff;
		height: 25px;
		display: flex;
		padding: 2px 4px;
		font-size: 12px;
		border-top: 1px solid;
		box-sizing: border-box;
		align-items: center;
		border-top-color: rgba(255, 255, 255, 0.1);
	}

	.bt1496 {
		width: 100%;
		height: 20px;
		display: inline-block;
		overflow: hidden;
		position: relative;
		font-size: 14px;
		word-break: break-all;
		line-height: 20px;
		vertical-align: middle;
		-webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
	}

	.bt1497 {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 8px;
		vertical-align: middle;
		font-size:0
	}

	.bt1497 img {
		width: auto;
		height: 100%;
	}

	.bt1498 {
		flex: 0 0 auto;
		color: #21a8f7;
		height: 16px;
		display: flex;
		z-index: 1;
		align-items: center;
	}

	.bt1498:last-of-type {
		text-align: right;
	}

	.bt1499 {
		color: #ffffff;
	}

	.bt1500 {
		margin-right: 8px;
	}

	.bt1501 {
		flex: 1;
		color: rgba(255,255,255,0.5);
		height: 16px;
		display: flex;
		overflow: hidden;
		position: relative;
		align-items: center;
		font-weight: 600;
		-webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
	}

	@media (hover: hover) {
		.bt1486:not(.bt1488):hover {
			background: rgba(25, 33, 43, 0.5);
		}
	}

	.bt1502 {
		color: #ffffff;
		width: 100%;
		height: 73px;
		display: flex;
		font-size: 14px;
		align-items: center;
		font-weight: 600;
		justify-content: center;
	}
	.bt1505{
		color: rgba(255,255,255,0.5);
	}
	.bt1109 .iconfont{
		color: rgba(255,255,255,0.5);
		margin-right:5px;
		font-size:12px;
	}
	.collapse-cells ::v-deep .el-icon-arrow-right{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		position: relative;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}
	.collapse-cells ::v-deep .el-collapse-item__arrow.is-active {
		transform: rotate(0);
	}
	.collapse-cells ::v-deep .el-icon-arrow-right:before{
		content: "\e6d9";
		color:#ffffff;
	}
	.collapse-cells ::v-deep .is-active .el-icon-arrow-right:before{
		content: "\e6d8";
	}
	.gm-header{
		display: flex;
		align-items: center;
	}
	.gm-header .bt7090 .iconfont{
		font-weight: normal;
		font-size: 24px;
	}
	.gm-header .icon-v{
		color: rgb(245, 166, 35);
	}
	.gm-header .el-icon-caret-bottom{
		font-size: 10px;
		color: rgba(255,255,255,0.5);
		margin-left: 5px;
	}
	.gm-list-title .iconfont{
		font-size: 10px;
		margin-right: 5px;
	}
	.gm-list-title {
		color: rgba(255,255,255,0.5);
	}
	.gm-list-title:hover{
		color: rgba(255,255,255,1);
	}
	.gm-action .iconfont{
		font-size:12px;
		color: rgba(255,255,255,0.5);
	}

	.show-more h2 {
		margin: 20px 0 0;
		font-size: 16px
	}

	.show-more h2,
	.show-more h3,
	.show-more h4 {
		color: #93acd3;
		font-weight: 600
	}

	.show-more strong {
		font-weight: 700
	}

	.show-more h3,
	.show-more h4 {
		margin: 20px 0 0;
		font-size: 14px
	}

	.show-more li,
	.show-more p {
		color: #55657e;
		font-size: 14px
	}

	.show-more ul {
		list-style: disc outside;
		padding-left: 25px
	}

	.show-more li {
		margin: 20px 0 0
	}

	.show-more li:last-of-type {
		margin-bottom: 20px
	}

	.show-more p+p {
		margin-top: 20px
	}

	.show-more a {
		text-decoration: none
	}

	.show-more__btn {
		display: block;
		margin: 10px auto 0
	}

	.show-more__btn .button__icon {
		opacity: .5;
		transition: all .2s
	}

	.show-more__btn--rotate-icon .button__icon {
		transform: rotate(180deg)
	}

	.show-more__content {
		max-height: var(--max-height);
		overflow: hidden;
		position: relative;
		transition: all .4s ease-in-out
	}

	.show-more__content:after {
		content: "";
		width: 100%;
		height: 130px;
		background: linear-gradient(180deg, rgba(13, 19, 28, 0), #0d131c);
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		pointer-events: none
	}

	.show-more__content--full {
		max-height: var(--full-height)
	}

	.show-more__content--full:after {
		display: none
	}
	.splide__arrow {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		padding: 0;
		cursor: pointer;
		height: 100%;
		z-index: 99;
		transition: background-color .1s ease-in-out
	}

	.splide__arrow:hover {
		background: rgba(13, 19, 28, .6)
	}

	.splide__arrow:hover .button {
		opacity: 1
	}

	.splide__arrow .button {
		opacity: .6;
		transition: opacity .1s ease-in-out
	}

	.splide__arrow--prev {
		left: 0
	}

	.splide__arrow--next {
		right: 0
	}
	.bt1 {
    width:100%;
    display:flex;
    position:relative;
    font-weight:400;
    flex-direction:column;
}
.bt34 {
    width:calc(100% - 320px);
    position:relative;
    box-sizing:border-box;
}
.bt35 .bt34 {
    flex: 1;
    width: 100%;
    overflow: visible;
}
.bt3487 {
    width:100%;
    padding:16px;
    position:relative;
    box-sizing:border-box;
}
.bt4624 {
    color:#ffffff;
    font-size:22px;
    font-weight:600;
    line-height:27px;
    margin-bottom:16px;
}
.bt4625 {
    display:flex;
    align-items:center;
}
.bt5151 {
    margin-bottom:16px;
}
.bt5153 {
    color:rgb(255,255,255);
    width:100%;
    display:flex;
    font-size:22px;
    align-items:center;
    font-weight:600;
}
.bt4632 {
    height:26px;
    display:flex;
    align-items:center;
    margin-right:8px;
    justify-content:center;
}
.bt4631 {
    transition:opacity 0.3s;
}
.bt5154 {
    display:flex;
    margin-bottom:16px;
}
.bt5156 {
    flex:1;
    overflow:hidden;
    flex-wrap:nowrap;
}
.bt5157 {
    position:relative;
}
.bt3500 {
    width:100%;
    height:100%;
    overflow:hidden;
    position:relative;
}
.bt3502 {
    width:100%;
    height:100%;
    overflow-x:auto;
    overflow-y:hidden;
    padding-bottom:50px;
}
.bt3501 {
    display:inline-block;
    white-space:nowrap;
    vertical-align:top;
}
.bt5158 {
    display:flex;
    flex-wrap:nowrap;
}
.bt4598 {
    cursor:pointer;
    height:40px;
    display:inline-flex;
    padding:0 16px;
    position:relative;
    font-size:14px;
    box-sizing:border-box;
    transition:background 0.5s,opacity 0.5s,color 0.5s;
    align-items:center;
    line-height:40px;
    user-select:none;
    border-radius:20px;
    vertical-align:middle;
}
.bt4603 {
    height:32px;
    font-size:12px;
    line-height:32px;
}
.bt5163 {
    color:rgb(255,255,255);
    font-size:12px;
    background:rgb(17,25,35);
    box-shadow:none;
    transition:all 0.3s ease 0s;
    font-weight:700;
    margin-right:8px;
}
.bt5164 {
    color:rgb(255,255,255);
    background:rgb(34,131,246);
}
.bt4606 {
    flex:1;
    width:100%;
    overflow:hidden;
    position:relative;
}
.bt4608 {
    width:100%;
    display:inline-block;
    z-index:1;
    white-space:nowrap;
}
.bt5166 {
    color:rgb(255,255,255);
    font-size:12px;
    background:rgb(17,25,35);
    box-shadow:none;
    transition:all 0.3s ease 0s;
    font-weight:700;
    margin-right:8px;
}
.bt5184 {
    min-width:304px;
}
.bt5185 {
    position:relative;
}
.bt5189 {
    color:rgb(255,255,255);
    width:100%;
    border:1px solid rgb(17,25,35);
    cursor:pointer;
    height:32px;
    padding:0px 16px;
    position:relative;
    font-size:12px;
    background:rgb(17,25,35);
    box-shadow:none;
    box-sizing:border-box;
    font-weight:600;
    line-height:32px;
    border-radius:15px;
}
.bt108 {
    color:inherit;
    display:flex;
    transition:all 0.3s;
    align-items:center;
    justify-content:center;
}
.bt5190 {
    transform:rotate(0deg);
}
.bt5188 {
    top:50%;
    right:8px;
    position:absolute;
    margin-top:-8px;
}
.bt5196 {
    width:calc(100% + 16px);
    margin:-8px;
    display:flex;
    flex-wrap:wrap;
    box-sizing:border-box;
}
.bt5197 {
    padding:8px;
    flex-grow:0;
    box-sizing:border-box;
}
.bt5199 {
    max-width:50%;
    flex-basis:50%;
}
.bt5195 {
    min-height:205px;
}
.bt35 .bt5199 {
	max-width: 100%;
	flex-basis: 100%;
}
.bt5194 .bt5195 {
    padding:8px;
}
.bt5357 {
    color:#ffffff;
    border:1px solid transparent;
    height:100%;
    display:flex;
    opacity:1;
    overflow:hidden;
    position:relative;
    background:#111923;
    box-sizing:border-box;
    min-height:264px;
    border-color:#111923;
    border-radius:6px;
    flex-direction:column;
}
.bt5359 {
    height:100%;
    display:flex;
    padding:0 8px 16px;
    align-items:flex-start;
    flex-direction:column;
    justify-content:space-between;
}
.bt5360 {
    width:100%;
}
.bt5362 {
    display:flex;
}
.bt5363 {
    flex:1;
    display:flex;
    padding:8px;
    flex-wrap:wrap;
    box-sizing:border-box;
}
.bt5373 {
    font-size:12px;
    font-weight:600;
    margin-right:8px;
    text-transform:uppercase;
}
.bt5374 {
    opacity:0.5;
    font-size:12px;
    font-weight:500;
}
.bt5364 {
    flex:1;
    display:flex;
    padding:8px;
    flex-wrap:wrap;
    box-sizing:border-box;
    text-align:right;
    align-items:center;
    justify-content:flex-end;
}
.bt5375 {
    min-height:16px;
    line-height:16px;
    margin-left:8px;
}
.bt5383 {
    color:rgb(255,255,255);
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
}
.bt5435 {
    color:rgb(245,166,35);
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
}
.bt5384 {
    color:#ffffff;
    border:1px solid;
    height:64px;
    display:flex;
    padding:8px;
    position:relative;
    background:#19212b;
    box-sizing:border-box;
    border-color:#19212b;
    border-radius:6px;
    flex-direction:column;
    justify-content:space-between;
    transition-duration:0.5s;
    transition-property:background,backgroundColor,color;
}
.bt5386 {
    cursor:pointer;
}
.bt5389 {
    display:flex;
}
.bt5390 {
    flex:1;
    height:16px;
    display:flex;
    overflow:hidden;
    position:relative;
    font-size:11px;
    word-break:break-all;
    font-weight:600;
    line-height:14px;
}
.bt5404 {
    color:rgba(255,255,255,0.5);
    width:100%;
    height:16px;
    overflow:hidden;
    font-weight:500;
    white-space:nowrap;
    -webkit-mask-image:linear-gradient(90deg,rgb(0,0,0) 80%,rgba(0,0,0,0) 100%);
}
.bt5405 {
    height:16px;
    display:flex;
    font-size:12px;
    align-items:center;
    font-weight:600;
    -webkit-font-smoothing:antialiased;
}
.bt5396 {
    color:rgba(255,255,255,0.5);
    height:auto;
    font-weight:500;
}
.bt5405:hover {
    color:rgb(255,255,255);
    cursor:pointer;
    transition:color 0.3s ease 0s;
}
.bt5396:hover {
    color:#ffffff;
}
.bt5400 {
    display:inline-block;
    margin-right:4px;
}
.bt5390 span {
    vertical-align:middle;
}
.bt5406 {
    height:16px;
    display:flex;
    overflow:hidden;
    font-size:inherit;
    word-break:break-all;
    align-items:center;
    line-height:16px;
    letter-spacing:0.03em;
}
.bt5403 {
    margin:0 2px;
    opacity:0.5;
    transform:rotate(-90deg);
}
.bt5391 {
    flex:0 0 auto;
    height:16px;
    display:flex;
    align-items:center;
    line-height:16px;
}
.bt5392 {
    display:block;
    font-size:0;
    line-height:0;
    padding-left:8px;
    vertical-align:middle;
}
.bt5394 {
    display:flex;
}
.bt5407 {
    flex:1;
    height:16px;
    display:flex;
    overflow:hidden;
    position:relative;
    flex-wrap:nowrap;
    font-size:14px;
    word-break:break-all;
    font-weight:600;
    line-height:16px;
}
.bt5409 {
    flex:1;
    height:auto;
    -webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,1) 80%,rgba(0,0,0,0) 100%);
}
.bt5411 {
    opacity:0.5;
    padding:0 4px;
}
.bt5410 {
    flex:0 0 auto;
    opacity:0.5;
    box-sizing:border-box;
    white-space:nowrap;
    padding-right:8px;
}
.bt5395 {
    flex:0 0 auto;
    height:16px;
    display:inline-flex;
    align-items:center;
    vertical-align:middle;
}
.bt5395:not(:empty) {
    width:auto;
}
.bt5412 {
    color:inherit;
    cursor:pointer;
    display:block;
    opacity:0.4;
    outline:none;
    transition:opacity .3s ease-in-out;
    text-decoration:none;
}
.bt5413 {
    display:block;
}
.bt5414 {
    padding:0 8px;
    font-weight:400;
}
.bt5415 {
    display:flex;
    opacity:0.4;
    font-size:12px;
    font-weight:600;
    padding-top:8px;
    justify-content:space-between;
}
.bt5417 {
    display:flex;
    font-size:14px;
    font-weight:600;
    padding-top:8px;
    text-transform:uppercase;
    justify-content:space-between;
}
.bt5419 {
    text-transform:none;
}
.bt5365 {
    flex:1;
    display:flex;
    padding:0 8px;
    margin-top:16px;
}
.bt5368 {
    flex:1;
}
.bt5368:not(.bt5372):first-of-type {
    margin-right:8px;
}
.bt5421 {
    text-align:center;
}
.bt5427 {
    color:rgb(255,255,255);
    width:100%;
    border:none rgb(34,131,246);
    cursor:pointer;
    height:40px;
    margin:0px auto;
    display:flex;
    outline:none;
    position:relative;
    font-size:14px;
    background:rgb(34,131,246);
    text-align:center;
    transition:opacity 0.5s ease 0s;
    align-items:center;
    font-weight:bold;
    border-radius:24px;
    flex-direction:column;
    text-transform:uppercase;
    justify-content:center;
}
.bt5427:hover {
    background:rgba(34,131,246,0.75);
    border-color:rgba(34,131,246,0.75);
}
.bt5369 {
    flex:initial;
}
.bt5368:not(.bt5372):last-of-type {
    margin-left:8px;
}
.bt5431 {
    color:rgb(255,255,255);
    width:100%;
    border:0px;
    cursor:pointer;
    outline:none;
    padding:0px 40px;
    position:relative;
    font-size:14px;
    min-width:192px;
    background:rgba(255,255,255,0.1);
    box-sizing:border-box;
    margin-top:24px;
    transition:all 0.3s ease 0s;
    font-family:inherit;
    font-weight:600;
    border-radius:24px;
    text-transform:uppercase;
}
.bt5428 {
    width:100%;
    position:relative;
    margin-top:24px;
}
.bt5370 {
    height:32px;
    display:flex;
    align-items:center;
    padding-left:16px;
    padding-right:16px;
}
.bt5377 {
    min-width:auto;
}
.bt5431:first-of-type {
    margin-top:0px;
}
.bt5431:hover {
    background:rgba(255,255,255,0.2);
}
.bt5424 {
    color:#f5a623;
    font-size:14px;
    text-align:center;
    font-weight:600;
    line-height:40px;
}
.bt5440 {
    color:rgb(255,255,255);
    width:100%;
    border:0px;
    cursor:pointer;
    outline:none;
    padding:0px 40px;
    position:relative;
    font-size:14px;
    min-width:192px;
    background:rgba(255,255,255,0.1);
    box-sizing:border-box;
    margin-top:24px;
    transition:all 0.3s ease 0s;
    font-family:inherit;
    font-weight:600;
    border-radius:24px;
    text-transform:uppercase;
}
.bt5378 {
    width:100%;
    display:flex;
    margin-top:8px;
    align-items:center;
}
.bt5434 {
    color:rgb(255,255,255);
    cursor:pointer;
    display:flex;
    opacity:0.5;
    position:relative;
    transition:all 0.3s ease 0s;
    align-items:center;
    justify-content:center;
}
.bt5380 {
    font-size:10px;
    font-weight:500;
    padding-left:8px;
    justify-content:flex-start;
}
.bt5434:hover {
    opacity:1;
}
.bt5434 span {
    margin-right:4px;
}
.bt5442 {
    color:rgb(255,79,79);
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
}
.bt5376 {
    line-height:0;
    margin-left:8px;
}
.bt5461 {
    color:rgb(255,255,255);
    height:12px;
    margin:0px;
    display:inline-block;
    padding:0px 4px;
    background:rgb(8,217,91);
    font-weight:600;
    line-height:12px;
    border-radius:2px;
    text-transform:uppercase;
    vertical-align:top;
    font-size:9px !important;
}
.bt5486 {
    color:rgb(126,211,33);
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
}
.bt5446 {
    color:#ffffff;
    border:1px solid;
    cursor:pointer;
    height:64px;
    padding:4px 8px 0;
    position:relative;
    background:#19212b;
    box-sizing:border-box;
    border-color:#19212b;
    border-radius:6px;
}
.bt5450 {
    right:40px;
    bottom:-2px;
    opacity:0.05;
    overflow:hidden;
    position:absolute;
    font-size:72px;
    font-weight:800;
    line-height:72px;
}
.bt5451 {
    top:26px;
    right:10px;
    position:absolute;
}
.bt5452 {
    transform:rotate(0deg);
}
.bt108 svg {
    fill:currentColor;
}
.bt5447 {
    font-size:18px;
    font-weight:500;
}
.bt5448 {
    left:8px;
    width:calc(100% - 16px);
    bottom:0;
    position:absolute;
}
.bt5453 {
    display:flex;
}
.bt5456 {
    background-color:#fa305c;
}
.bt5454 {
    height:2px;
    display:inline-block;
    font-size:0;
    background:#ffffff;
    line-height:0;
    margin-right:2px;
}
.bt5454:last-of-type {
    margin-right:0;
}
.bt5455 {
    background-color:#2ddc4b;
}
.bt5449 {
    height:32px;
    display:flex;
    align-items:center;
}
.bt5449 .bt5451 {
    top:9px;
}
.bt5452 {
    transform:rotate(-180deg);
}
.bt5449 .bt5447 {
    font-size:11px;
    font-weight:600;
}
.bt5443 {
    padding-top:8px;
}
.bt5385 {
    height:88px;
}
.bt5387 {
    right:40px;
    bottom:-10px;
    opacity:0.05;
    z-index:1;
    overflow:hidden;
    position:absolute;
    font-size:72px;
    font-weight:800;
    line-height:72px;
}
.bt5389 {
    display:flex;
}
.bt5394 {
    display:flex;
}
.bt5388 {
    opacity:0.4;
    font-size:12px;
    font-weight:600;
}
.bt5577 {
    color:rgb(255,255,255);
    width:100%;
    border:none rgb(34,131,246);
    cursor:pointer;
    height:40px;
    margin:0px auto;
    display:flex;
    outline:none;
    position:relative;
    font-size:14px;
    background:rgb(34,131,246);
    text-align:center;
    transition:opacity 0.5s ease 0s;
    align-items:center;
    font-weight:bold;
    border-radius:24px;
    flex-direction:column;
    text-transform:uppercase;
    justify-content:center;
}
.bt5577:hover {
    background:rgba(34,131,246,0.75);
    border-color:rgba(34,131,246,0.75);
}
.bt5428:first-of-type {
    margin-top: 0;
}
.bt5456 {
    background-color: #fa305c;
}
.bt5441 {
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: flex;
    opacity: 0.5;
    position: relative;
    transition: all 0.3s ease 0s;
    align-items: center;
    justify-content: center;
}
.bt5441:hover {
    opacity: 1;
}
.bt5408 {
    flex: 0 0 auto;
    box-sizing: border-box;
    white-space: nowrap;
    padding-right: 8px;
}
.bt2192 {
    color: rgb(255, 79, 79);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}
.bt2196 {
    color: rgb(126, 211, 33);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}
.bt2040 {
    color: #ffffff;
    border: 1px solid;
    cursor: pointer;
    height: 64px;
    padding: 4px 8px 0;
    position: relative;
    background: #19212b;
    box-sizing: border-box;
    border-color: #19212b;
    border-radius: 6px;
}
.bt2045 {
    top: 26px;
    right: 10px;
    position: absolute;
}
.bt101 {
    color: inherit;
    display: flex;
    transition: all 0.3s;
    align-items: center;
    justify-content: center;
}
.bt2119 {
    transform: rotate(0deg);
}
.bt2044 {
    right: 40px;
    bottom: -2px;
    opacity: 0.05;
    overflow: hidden;
    position: absolute;
    font-size: 72px;
    font-weight: 800;
    line-height: 72px;
}
.bt2041 {
    font-size: 18px;
    font-weight: 500;
}
.bt2042 {
    left: 8px;
    width: calc(100% - 16px);
    bottom: 0;
    position: absolute;
}
.bt2217 {
    display: flex;
}
.bt2218 {
    height: 2px;
    display: inline-block;
    font-size: 0;
    background: #ffffff;
    line-height: 0;
    margin-right: 2px;
}
.bt2220 {
    background-color: #fa305c;
}
.bt2043 {
    height: 32px;
    display: flex;
    align-items: center;
}
.bt2043 .bt2045 {
    top: 9px;
}
.bt2043 .bt2119 {
    transform: rotate(-180deg);
}
.bt2043 .bt2041 {
    font-size: 11px;
    font-weight: 600;
}
</style>
