import AddCreditForm from "./components/AddCreditForm"
import Credit from "./components/CreditList"

function App() {

  return (
      <main>
        <section className="p-4">
          <AddCreditForm />
          <Credit />
        </section>
      </main>
  )
}

export default App
