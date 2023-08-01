import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { MEALS } from "../data/data";
import MealDetails from "../components/MealDetails";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/favorites-context";

export default function MealDetailScreen({ route, navigation }) {
  const favoritemealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoritemealsCtx.ids.includes(mealId);

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      favoritemealsCtx.removeFavorite(mealId);
    } else {
      favoritemealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            onPressFnc={headerButtonPressHandler}
            color="black"
          />
        );
      },
    });
  }, [headerButtonPressHandler, navigation]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Ingredients</Text>
          </View>

          {selectedMeal.ingredients.map((ingredient) => (
            <View style={styles.listItem} key={ingredient}>
              <Text>{ingredient}</Text>
            </View>
          ))}
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Steps</Text>
          </View>

          {selectedMeal.steps.map((step) => (
            <View key={step} style={styles.listItem}>
              <Text>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 8,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#cccfcf",
  },
  outerContainer: {
    // width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    maxWidth: "90%",
  },
});
