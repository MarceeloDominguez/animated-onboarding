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

  const isLastScreen = screenIndex === onboardingSteps.length - 1;
  const onContinue = () => {
    if (isLastScreen) {
      router.replace("/home");
      setScreenIndex(0);
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ marginTop: 50, backgroundColor: "orange" }}>
        <Text>Lineas</Text>
      </View>
      <View style={styles.containerImage}>
        <Image source={data.image} style={styles.image} />
      </View>
      <View style={styles.pageContent}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.wrapperButton}>
          <Link href={"/home"} asChild>
            <Pressable style={styles.buttonSkip}>
              <Text style={styles.textButton}>Skip</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.buttonNext} onPress={onContinue}>
            <Text style={[styles.textButton, { color: "#1E1E1E" }]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
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
    marginTop: "auto",
  },
  title: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 26,
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
});
