# Lilly Technical Challenge Documentation Template

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach
*How did you approach this challenge? Did you work through the objectives in any particular order? If so, why? Did you utilize any external resources, such as tutorials, guides, or other materials?*

### Initial Thoughts

First I outlined what the objectives are and how they translate into requirements / what my thoughts are for as to how I might implement the required features.

  - Fetch data from backend through API
  - Display data in readable way
  - Handle null/undefined data (probably through conditional rendering)
  - Form for creating new medicine
  - Implement improved UI
  - Function for average price of all medicines

**UI:**

My initial thoughts for the user interface was A layout like this:

![initial ui](docs/images/initial-ui.png)

This helped me understand what UI features will be needed and thus what data / state these features need. Which helped inform how I developed frontend.

**Development Approach:**

My approach for developing this web app was to use the practices I was familiar with from using frameworks like React / Next. I seperated the file structure out in a way which made it clearer to understand what different parts of the code base are used for.

This looked like:
```
.
└── frontend/
    ├── components
    ├── lib/
    │   ├── utils.js
    │   └── types.js
    ├── script.js
    ├── styles.css
    └── index.html
```

I also want to include some level of typesaftey (as much as possible in vanilla js), assuming that we can't use TypeScript. I am going to make use of [JS Doc](https://jsdoc.app/) type defs in order to accomplish this.

### Development

**API Utils:** 

The first task I decided to do in the development was create the API util functions that I would use to interface with the FastAPI. This is essentially what I implemented for each API route:

```js
/**
 * Fetches all medicines from the backend.
 * @returns {Promise<Medicine[]>}
 */
export async function getAllMedicines() {
  const response = await fetch(`${BASE_URL}/medicines`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data["medicines"];
  }
}
```

Pretty simple.

**Displaying Data**:

In order to display that data I first had to create the layout of the page in the `index.html`, which looked like this:

```html
<body>
    <div id="disclaimer" class="disclaimer">
        Disclaimer: All medicine names and prices used in this application are fictional and do not
        represent any real medicine(s).
    </div>
    <main>
        <aside id="sidebar" class="sidebar">
            <div id="search" class="search-container"></div>
            <div id="form" class="form-container"></div>
            <div id="info" class="info-container"></div>
        </aside>
        <div id="medicines" class="medicines"></div>
    </main>
    <script type="module" src="script.js"></script>
</body>
```

The first aspect of data which I could display was the list of all medicines. This was accomplished by fetching all the medicines and through the list to map each medicine to a `medicine-card` component. Like this:

```js
const root = document.getElementById("medicines");
root.innerHTML = "Loading...";

try {
  const medicines = await getAllMedicines();
  root.innerHTML = "";

  medicines.forEach((medicine) => {
    const card = createMedicineCard(medicine);
    if (card) root.appendChild(card);
  });

} catch (error) {
  root.innerHTML = "Failed to load medicines.";
  console.error(error);
}
```

With the output being this:

![initial output](docs/images/initial-output.png)

This same methodology of using components and mapping them to the DOM can be used to implement the following features as well:

- The search bar
- The create/update form
- And the info section

When implemented I had this:

![unstyled ui](docs/images/unstyled-ui.png)


The functionality for searching was pretty simple to implement. All I had to do was move the `medicines` array fetched from the API into the global scope so that I could filter through it when the value of the input changes.

```js
const filteredMedicines = medicines.filter(medicine =>
  medicine.name.toLowerCase().includes(value.toLowerCase())
);
```

The form works by checking what action was selected to decided what API util function to pass the form data into in order to peform the mutation on the backend.

```js
if (action === "create") {
  const response = await createMedicine(formData);
} else {
  const response = await updateMedicine(formData);
}
```

**Styling:**

A big improvement that can be made now is on the styles. My idea of the layout has changed a little from the start, now I am going to place the sidebar on the left instead. 

After applying some simple styles, making use of CSS variables, I had this:

![styled ui](docs/images/styled-ui.png)

As of now the UI is not completely responsive.

**Average Function:**

In order to implement the info component I will first have to implement the `average` API route. 

This was simple to implement. The function simply iterates through the medicines array to record the total price of all medicines (acounting for null values).

```python
with open('data.json', 'r') as meds:
    current_db = json.load(meds)
    medicines = current_db["medicines"]
    total = 0
    num_meds = len(medicines)
    for med in medicines:
        price = med["price"]

        if isinstance(price, (int, float)) and price != None:
            total += price
        else:
            num_meds -= 1

    
    if num_meds <= 0:
        return { "error" : "No valid average available."}
    
    return { "average" : total / num_meds}
```

**Finishing UI:**

Now that I have implemented the avearge API route I can create the info component which simply displays the average medicine price:

![info](docs/images/info.png)

The last UI feature which needs to be implemented is the deleting of medicines. In order to do this I am going to make some changes to the `medicine-card` component. 

The change was adding a button to the card to call the `deleteMedicine` util (which I had to modify to take in `FormData`) on click. Adding this meant I had to alter the component so that it used only `appendChild` and not `innerHTML` as they were causing conflicts.

Once implemented the card looked like this:

![updated card](image.png)

**Final Changes:** 

When playing around with the solution I noticed that there were some issues with the backend API. When creating and updating the medicines it was being case sensitive and not checking for duplicates. This meant that you could create more than one medicine with the same name (which shouldn't be allowed as in this case the name is the unique identifier) and when updating the medicines if you don't use the correct casing the update will not be applied. So I made these simple changes to the backend API.

```python
# in create_med
if name.lower() in (med.name.lower() for med in current_db["medicines"]):
            return { "error" : "Medicine already exists."}

# in update_med and delete_med
- if med['name'] == name:
+ if med['name'].lower() == name.lower():

```

This solved a few UX issues I was having.

## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*

I like how I've structured the code base, it really helped ease the development process. It was nice to have that familiar feeling of the component based architecture that you get with libraries like React.

I'm quite proud of the level of the speed of searching for specific medicines. However, I do not think my implementation of the filtering is scalable. If there was a larger data set of medicines it could become much slower.

I like that the form can be used for both updating and creating medicines.

## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.

One of the most challenging aspects of this task , for me, was developing it in JavaScript without TypeScript. The mental mapping and things I have gotten used to with TS meant that there were times where I didn't consider that certain values could be null or undefined before trying to access them (as I would have usually got a warning). But I think I was able to overcome this after a while and with the use of JS Doc. 

I had some issues with passing the data to the API at the beginning. However, once I realised it was expecting `FormData` I didn't have an issues with it. 

If I had more time I would have like to improve the responsiveness of the design so that it was more usable on smaller viewports like phones.

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*

Overall I feel like I was able to implement a user friendly interface for interacting with all aspects of the backend API. If I were to do this again and given more time I would probably though more about the layout and design. I think there is probably a better / more intutive way to structure the page. Although I like the multiple use cases form I do think that it can be unclear as to how it works and it also might be better to seperate the create and update functions more.