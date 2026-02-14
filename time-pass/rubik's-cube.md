# 🧩 Rubik’s Cube – Step-by-Step Notes

## 🔤 Basic Notations

| Notation | Meaning     |
| -------- | ----------- |
| `F`      | Front Right |
| `R`      | Right Up    |
| `U`      | Up Left     |
| `R'`     | Right Down  |
| `U'`     | Up Right    |
| `F'`     | Front Left  |
| `L`      | Left Up     |
| `L'`     | Left Down   |
| `D`      | Down Right  |
| `D'`     | Down Left   |

---

## 🥇 Step 1: Make One Full Face (Cross)

Create one complete face (usually white).

---

## 🥈 Step 2: Complete First Layer

Finish the entire first layer (including corners).

---

## 🥉 Step 3: Match Second Layer

To match the second layer:
    - Assume the edge piece is not in its correct place.
    - Look at its color.
    - Move it to the opposite face.
    - Move opposite and opposite down as needed.

---

## 🔁 Up–Down Adjustment

Use:`U D`

For positioning adjustments when required.

---

## ➕ Step 4: To Match “+” (Top Cross)

- Keep `one face fixed`
- Apply the algorithm
- If needed, apply `2 times` and change sides
- If you get a line shape (`—`), keep it horizontal
- Apply the algorithm again

---

## 🔄 Step 5: Match All Top Edges

- If `one side matches`, keep that face toward you.
- If `two adjacent sides match`, keep them at `Front & Back (F & B)`.
- If `two opposite sides match`, keep them at `Front & Back (F & B)` and apply the algorithm.

---

## 📍 Step 6: Match Edge Positions

- `Not exact color – just correct position`
- Fix any face (do not change it).
- Keep the matched edge at: `Top Left Corner (TLC)`
- Assume orientation.
- Do not change the fixed face until all positions match.

---

## 🔺 Step 7: Match Right Corners (Exact Place)

- Keep the matched corner on the `left`.
- Keep the target corner on the `right`.
- Apply the algorithm.
- If one corner matches and another becomes dismatched — don’t worry.
- Continue for the next target.
- Bottom layer will adjust automatically.

---

## 🧠 Algorithms (As Written in Notes)

### ⭐ Algorithm 1

```bash
    R U R' U R U2 R'
```

---

### ⭐ Algorithm 2 (Edge Insertion)

```bash
   R U' L' U R' U' L
```

---

### ⭐ Final Step Algorithm

```bash
   R' D' R D
```

---

## 📌 Summary Flow

1. Make one full face
2. Complete first layer
3. Solve second layer
4. Make top cross (+)
5. Match all top edges
6. Match edge positions
7. Match final corners
