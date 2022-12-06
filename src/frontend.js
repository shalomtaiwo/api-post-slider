import "./css/frontend.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "@wordpress/element";
import dayjs from "dayjs";
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

const divsToUpdate = document.querySelectorAll("#apislider");

const Frontend = (props) => {
	const [posts, setPosts] = useState([]);
	// const props = props;

	useEffect(() => {
		if (!posts) return;
		postApi(props.postwebsite);
	}, []);

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

	return (
		<>
			<div>
				{posts && posts.length !== 0 ? (
					<Swiper
						spaceBetween={10}
						slidesPerView={1}
						keyboard={{
							enabled: !props.keyboard ? false : props.keyboard,
						}}
						grabCursor={props.grabcursor}
						loop={true}
						navigation={!props.navigation ? false : props.navigation}
						autoplay={
							!props.autoplay
								? false
								: {
										delay: 2500,
										disableOnInteraction: false,
								  }
						}
						pagination={
							props.bullets === false
								? false
								: {
										dynamicBullets: true,
										clickable: true,
								  }
						}
						effect={`${props.effect}`}
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
												backgroundColor: props.content_bgcolor,
												color: props.content_color,
											}}
										>
											<h3
												style={{
													backgroundColor: props.content_bgcolor,
													color: props.content_color,
												}}
											>
												{post.title.rendered}
											</h3>
											<p
												style={{
													backgroundColor: props.content_bgcolor,
													color: props.content_color,
												}}
											>
												{props.author ? (
													<i>By {`${post._embedded.author[0].name}`}</i>
												) : null}
												{props.post_date ? (
													<i>
														Published: {dayjs(post.date).format("DD/MM/YYYY")}
													</i>
												) : null}
											</p>
											<a href={post.link}>
												<button
													style={{
														backgroundColor: props.buttonBg,
														color: props.buttonColor,
													}}
												>
													{props.view_more}
												</button>
											</a>
										</div>
									) : (
										<>
											<img
												src={
													post?._embedded["wp:featuredmedia"][0]?.source_url ||
													""
												}
												alt="slide 1"
											/>
											<div className="apioverlay"></div>
											<div
												className="slideContentapi"
												style={{
													backgroundColor: props.content_bgcolor,
													color: props.content_color,
												}}
											>
												<h3
													style={{
														backgroundColor: props.content_bgcolor,
														color: props.content_color,
													}}
												>
													{post.title.rendered}
												</h3>
												<p
													style={{
														backgroundColor: props.content_bgcolor,
														color: props.content_color,
													}}
												>
													{props.author ? (
														<i>By {`${post._embedded.author[0].name}`}</i>
													) : null}
													{props.post_date ? (
														<i>
															Published: {dayjs(post.date).format("DD/MM/YYYY")}
														</i>
													) : null}
												</p>
												<a href={post.link}>
													<button
														style={{
															backgroundColor: `${props.buttonBg} !important`,
															color: props.buttonColor,
														}}
													>
														{props.view_more}
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
};

export default Frontend;

divsToUpdate.forEach(function (div) {
	const data = JSON.parse(div.querySelector("pre").innerHTML);
	ReactDOM.render(
		<Frontend
			postwebsite={data.postwebsite}
			navigation={data.navigation}
			autoplay={data.autoplay}
			bullets={data.bullets}
			keyboard={data.keyboard}
			author={data.author}
			post_date={data.post_date}
			view_more={data.view_more}
			effect={data.effect}
			content_color={data.content_color}
			content_bgcolor={data.content_bgcolor}
			arrow_color={data.arrow_color}
			buttonBg={data.buttonBg}
			buttonColor={data.buttonColor}
		/>,
		div
	);
	div.classList.remove("apislider");
});

// ReactDOM.render(<Frontend />, document.getElementById("apislider"));
