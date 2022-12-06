import React, { useEffect } from "react";
import "./css/index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	Keyboard,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	EffectCube,
	EffectCreative,
	EffectCards,
	EffectFlip,
} from "swiper";
import { InspectorControls } from "@wordpress/block-editor";
import {
	ColorPalette,
	PanelBody,
	PanelRow,
	TextControl,
	__experimentalText as Text,
	ToggleControl,
	ComboboxControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import dayjs from "dayjs";
import { useState } from "@wordpress/element";

wp.blocks.registerBlockType("apipsl/api-post-slider", {
	title: "Post Slider",
	icon: "smiley",
	category: "design",
	script: "wp-slider-api",
	style: "wp-slider-api",
	attributes: {
		postwebsite: {
			type: "string",
		},
		navigation: {
			type: "boolean",
		},
		autoplay: {
			type: "boolean",
		},
		bullets: {
			type: "boolean",
		},
		keyboard: {
			type: "boolean",
		},
		author: {
			type: "boolean",
		},
		post_date: {
			type: "boolean",
		},
		view_more: {
			type: "string",
		},
		effect: {
			type: "string",
		},
		content_color: {
			type: "string",
			default: "#000",
		},
		content_bgcolor: {
			type: "string",
			default: "#fff",
		},
		buttonBg: {
			type: "string",
		},
		buttonColor: {
			type: "string",
			default: "#fff",
		},
	},
	edit: (props) => {
		const colors = [
			{ name: "red", color: "#f00" },
			{ name: "white", color: "#fff" },
			{ name: "blue", color: "#00f" },
			{ name: "black", color: "#000" },
		];

		const effectType = [
			{
				value: "fade",
				label: "fade",
			},
			{
				value: "creative",
				label: "creative",
			},
			{
				value: "cards",
				label: "cards",
			},
			{
				value: "coverflow",
				label: "coverflow",
			},
			{
				value: "cube",
				label: "cube",
			},
			{
				value: "flip",
				label: "flip",
			},
		];

		const [posts, setPosts] = useState([]);
		const { attributes, setAttributes } = props;
		const [filteredOptions, setFilteredOptions] = useState(effectType);

		const postApi = async (websiteURL) => {
			var requestOptions = {
				method: "GET",
			};
			const response = await fetch(
				`${websiteURL}/wp-json/wp/v2/posts?_embed`,
				requestOptions
			);
			if (!response.ok) {
				throw new Error("Error Fetching");
			}
			const data = await response.json();
			setPosts(data);
		};
		useEffect(() => {
			if (!posts) return;
			postApi(attributes.postwebsite);
		}, []);

		return (
			<>
				<div>
					<h5>Post Slider</h5>
					<InspectorControls>
						<PanelBody
							title="Post Meta"
							initialOpen={true}
						>
							<PanelRow>
								<TextControl
									label="Website URL"
									value={attributes.postwebsite}
									help={`Save changes, reload to see new postwebsite post.\nStructure: https://site.com`}
									placeholder="https://wptavern.com"
									onChange={(value) => setAttributes({ postwebsite: value })}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label="Excerpt text"
									value={attributes.view_more}
									onChange={(value) => setAttributes({ view_more: value })}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Author"
									checked={attributes.author}
									onChange={(value) => {
										setAttributes({ author: value });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Show Date"
									checked={attributes.post_date}
									onChange={(value) => {
										setAttributes({ post_date: value });
									}}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title="Slider Settings"
							initialOpen={false}
						>
							<PanelRow>
								<ToggleControl
									label="Navigation"
									checked={attributes.navigation}
									onChange={(value) => {
										setAttributes({ navigation: value });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Autoplay"
									checked={attributes.autoplay}
									onChange={(value) => {
										setAttributes({ autoplay: value });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Keyboard Control"
									checked={attributes.keyboard}
									onChange={(value) => {
										setAttributes({ keyboard: value });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ComboboxControl
									label="Effect"
									value={attributes.effect}
									onChange={(value) => {
										setAttributes({ effect: value });
									}}
									options={filteredOptions}
									onFilterValueChange={(inputValue) =>
										setFilteredOptions(
											effectType.filter((effectType) =>
												effectType.label
													.toLowerCase()
													.startsWith(inputValue.toLowerCase())
											)
										)
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Dynamic bullets"
									checked={attributes.bullets}
									onChange={(value) => {
										setAttributes({ bullets: value });
									}}
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title="Slider Styling"
							initialOpen={false}
						>
							<PanelRow>
								<Text adjustLineHeightForInnerControls>
									Content Text color
									<ColorPalette
										colors={colors}
										value={attributes.content_color}
										onChange={(value) => {
											setAttributes({ content_color: value });
										}}
									/>
								</Text>
							</PanelRow>
							<PanelRow>
								<Text adjustLineHeightForInnerControls>
									Content Background color
									<ColorPalette
										colors={colors}
										value={attributes.content_bgcolor}
										onChange={(value) => {
											setAttributes({ content_bgcolor: value });
										}}
									/>
								</Text>
							</PanelRow>
							<PanelRow>
								<Text adjustLineHeightForInnerControls>
									Button Background
									<ColorPalette
										colors={colors}
										value={attributes.buttonBg}
										onChange={(value) => {
											setAttributes({ buttonBg: value });
										}}
									/>
								</Text>
							</PanelRow>
							<PanelRow>
								<Text adjustLineHeightForInnerControls>
									Button Text color
									<ColorPalette
										colors={colors}
										value={attributes.buttonColor}
										onChange={(value) => {
											setAttributes({ buttonColor: value });
										}}
									/>
								</Text>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
					{posts && posts.length !== 0 ? (
						<Swiper
							spaceBetween={10}
							slidesPerView={1}
							keyboard={{
								enabled: `${attributes.keyboard}`,
							}}
							grabCursor={attributes.grabcursor}
							loop={true}
							navigation={attributes.navigation}
							pagination={
								attributes.bullets === false
									? false
									: {
											dynamicBullets: true,
											clickable: true,
									  }
							}
							creativeEffect={{
								prev: {
									shadow: true,
									translate: [0, 0, -400],
								},
								next: {
									translate: ["100%", 0, 0],
								},
							}}
							cubeEffect={{
								shadow: true,
								slideShadows: true,
								shadowOffset: 20,
								shadowScale: 0.94,
							}}
							coverflowEffect={{
								rotate: 50,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: true,
							}}
							modules={[
								EffectFade,
								EffectCreative,
								EffectCards,
								EffectFlip,
								EffectCube,
								EffectCoverflow,
								Navigation,
								Pagination,
								Keyboard,
								Autoplay,
							]}
							className="mySwiper"
						>
							{posts.map((post, index) => {
								return (
									<SwiperSlide
										key={index}
										id={post.id}
									>
										{!post?._embedded["wp:featuredmedia"][0]?.source_url ? (
											<div
												className="slideContentapi_no_image"
												style={{
													backgroundColor: attributes.content_bgcolor,
													color: attributes.content_color,
												}}
											>
												<h3
													style={{
														backgroundColor: attributes.content_bgcolor,
														color: attributes.content_color,
													}}
												>
													{post.title.rendered}
												</h3>
												<p
													style={{
														backgroundColor: attributes.content_bgcolor,
														color: attributes.content_color,
													}}
												>
													{attributes.author ? (
														<i>By {`${post._embedded.author[0].name}`}</i>
													) : null}
													{attributes.post_date ? (
														<i>
															Published: {dayjs(post.date).format("DD/MM/YYYY")}
														</i>
													) : null}
												</p>
												<a href={post.link}>
													<button
														style={{
															backgroundColor: attributes.buttonBg,
															color: attributes.buttonColor,
														}}
													>
														{attributes.view_more}
													</button>
												</a>
											</div>
										) : (
											<>
												<img
													src={
														post?._embedded["wp:featuredmedia"][0]
															?.source_url || ""
													}
													alt="slide 1"
												/>
												<div className="apioverlay"></div>
												<div
													className="slideContentapi"
													style={{
														backgroundColor: attributes.content_bgcolor,
														color: attributes.content_color,
													}}
												>
													<h3
														style={{
															backgroundColor: attributes.content_bgcolor,
															color: attributes.content_color,
														}}
													>
														{post.title.rendered}
													</h3>
													<p
														style={{
															backgroundColor: attributes.content_bgcolor,
															color: attributes.content_color,
														}}
													>
														{attributes.author ? (
															<i>By {`${post._embedded.author[0].name}`}</i>
														) : null}
														{attributes.post_date ? (
															<i>
																Published:{" "}
																{dayjs(post.date).format("DD/MM/YYYY")}
															</i>
														) : null}
													</p>
													<a href={post.link}>
														<button
															style={{
																backgroundColor: attributes.buttonBg,
																color: attributes.buttonColor,
															}}
														>
															{attributes.view_more}
														</button>
													</a>
												</div>
											</>
										)}
									</SwiperSlide>
								);
							})}
						</Swiper>
					) : (
						<p className="slide_empty_state">
							<span>No Post available here</span>
							<span>or check access control level</span>
						</p>
					)}
				</div>
			</>
		);
	},

	save: (props) => {
		return null;
	},
});
