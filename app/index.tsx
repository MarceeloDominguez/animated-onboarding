import { Link, router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

const { height: HEIGHT_SCREEN, width: WIDTH_SCREEN } = Dimensions.get("screen");

const onboardingSteps = [
  {
    title: "Discover Our Products",
    description:
      "Browse thousands of products, from fashion to tech, Find what you'ove, effortlessly.",
    image: require("@/assets/images/image-1.png"),
  },
  {
    title: "Hassle-Free Checkout",
    description:
      "Seamless payments and speedy delivery. Start shopping smarter today.",
    image: require("@/assets/images/image-2.png"),
  },
  {
    title: "Easy and Happy Shopping",
    description: "Start shopping now and enjoy a world of convenience!",
    image: require("@/assets/images/image-3.png"),
  },
];

export default function Onboarding() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      router.navigate("/home");
      setScreenIndex(0);
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      setScreenIndex(0);
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);

  const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);

  const swipes = Gesture.Simultaneous(swipeBack, swipeForward);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((item, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor: index === screenIndex ? "#D7FC70" : "#808080",
              },
            ]}
          />
        ))}
      </View>
      <GestureDetector gesture={swipes}>
        <View style={styles.wrapperPage} key={screenIndex}>
          <Animated.View
            style={styles.containerImage}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Image source={data.image} style={styles.image} />
          </Animated.View>
          <View style={styles.pageContent}>
            <Animated.Text
              style={styles.title}
              entering={SlideInRight}
              exiting={SlideOutLeft}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              style={styles.description}
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
            >
              {data.description}
            </Animated.Text>
            <View style={styles.wrapperButton}>
              <Link href={"/home"} asChild>
                <Pressable style={styles.buttonSkip}>
                  <Text style={styles.textButton}>Skip</Text>
                </Pressable>
              </Link>
              <Pressable style={styles.buttonNext} onPress={onContinue}>
                <Text style={[styles.textButton, { color: "#1E1E1E" }]}>
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
  },
  wrapperPage: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerImage: {
    marginTop: 14,
  },
  image: {
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN <= 640 ? HEIGHT_SCREEN * 0.35 : HEIGHT_SCREEN * 0.5,
    resizeMode: "contain",
  },
  pageContent: {
    padding: 20,
    gap: 14,
    marginBottom: 30,
    // marginTop: "auto",
  },
  title: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  description: {
    color: "#808080",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  wrapperButton: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
  },
  buttonSkip: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonNext: {
    backgroundColor: "#D7FC70",
    flex: 1,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FBFBFB",
  },
  stepIndicatorContainer: {
    marginTop: 45,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
  },
  stepIndicator: {
    height: 3,
    flex: 1,
    borderRadius: 3 / 2,
  },
});
