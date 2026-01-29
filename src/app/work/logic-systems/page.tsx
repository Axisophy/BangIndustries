'use client';

import { CircuitPlayground } from './components/CircuitPlayground';
import { DecisionBoundary } from './components/DecisionBoundary';
import { LogicToMLBridge } from './components/LogicToMLBridge';

export default function LogicSystemsPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='max-w-full lg:max-w-[75%]'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
            From Gates to Gradients
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
            How logic circuits become learning machines
          </p>
          <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
            Machine learning can feel like magic  - or like impenetrable mathematics.
            Neither is true. This interactive guide builds from something concrete
            (logic gates, the AND/OR/NOT you might remember from school) to something
            powerful (neural networks that can learn almost any pattern). The key
            insight: they&apos;re all doing the same thing  - dividing space into regions.
          </p>
          {/* Tags */}
          <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Interactive</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Education</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Machine learning</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Mxwll</span>
          </div>
        </div>
      </section>

      {/* Static image placeholder */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 bg-black/5 aspect-[2/1] flex items-center justify-center'>
          <span className='text-black/30 text-sm font-mono'>logic_to_ml_progression.png</span>
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          The same classification problem solved three ways: Boolean logic (sharp quadrants),
          decision tree (axis-aligned rectangles), neural network (smooth curves).
        </p>
      </section>

      {/* Part A: Boolean Logic */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-4'>Part A: Boolean Logic</h2>
        <p className='text-black/70 leading-relaxed max-w-3xl mb-8'>
          Start here. Logic gates are simple: AND outputs 1 only if both inputs are 1.
          OR outputs 1 if either is 1. NOT flips the value. Click the inputs below
          to see how signals flow through a circuit.
        </p>
        <CircuitPlayground />
      </section>

      {/* Part B: Decision Boundaries */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-4'>Part B: Decision Boundaries</h2>
        <p className='text-black/70 leading-relaxed max-w-3xl mb-8'>
          Now forget the rules. Instead of telling a computer exactly what to do,
          we show it examples and let it figure out the pattern. The coloured regions
          show what the model has learned  - where it would classify new data points.
        </p>
        <DecisionBoundary />
      </section>

      {/* The Bridge */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-4'>The Bridge: From Logic to Learning</h2>
        <p className='text-black/70 leading-relaxed max-w-3xl mb-8'>
          Here&apos;s the connection: logic gates create sharp, hand-coded boundaries.
          Decision trees learn chunky, axis-aligned splits. Neural networks learn
          smooth curves. Each step adds flexibility  - and the ability to learn
          from data rather than being programmed by hand.
        </p>
        <LogicToMLBridge />
      </section>

      {/* Content sections */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24'>

          {/* Left column - main content */}
          <div className='lg:col-span-2 space-y-8 md:space-y-10 lg:space-y-12'>

            {/* The Challenge */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                The Challenge
              </h2>
              <p className='text-black/70 leading-relaxed'>
                Machine learning has a reputation problem. To non-specialists, it appears as either impenetrable mathematics or magical black boxes. Neither framing helps people understand what these systems actually do, why they work, or where they fail. For Mxwll, we wanted to build a bridge from the familiar (logic gates, the kind you might have encountered in a physics class) to the unfamiliar (neural networks, the kind that power modern AI).
              </p>
            </div>

            {/* Background */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Background
              </h2>
              <div className='space-y-4 text-black/70 leading-relaxed'>
                <p>
                  Boolean logic is the foundation of all digital computation. AND gates output 1 only if both inputs are 1. OR gates output 1 if either input is 1. NOT gates flip the input. From these primitives, you can build any computable function  - including arithmetic, memory, and entire computers.
                </p>
                <p>
                  The key insight connecting logic to machine learning is the concept of a decision boundary. A Boolean function divides its input space into regions that map to 0 or 1. A machine learning classifier does the same thing  - but instead of the boundary being hand-designed, it is learned from examples.
                </p>
                <p>
                  The simplest ML classifier (logistic regression) learns a single straight line to separate classes. More complex models (polynomial features, neural networks) learn curved or wiggly boundaries. The tradeoff is always between flexibility and the risk of overfitting  - memorising the training data rather than learning the underlying pattern.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Approach
              </h2>
              <div className='space-y-4 text-black/70 leading-relaxed'>
                <p>
                  We built three interactive components that work as a progression:
                </p>
                <p>
                  The circuit playground lets users manipulate Boolean gates and see truth tables update in real time. Pre-built examples (AND gate, XOR from NANDs, half-adder) show how complex functions emerge from simple parts.
                </p>
                <p>
                  The decision boundary visualiser plots training points in 2D and shows how different classifiers carve up the space. Sliders let users adjust regularisation (for linear models), k (for k-NN), or kernel width (for RBF) to see underfitting and overfitting in action.
                </p>
                <p>
                  The bridge diagram shows the conceptual progression from fixed logic to learned rules to smooth approximations, emphasising that neural networks are not magic  - they are compositions of simple functions, just like logic circuits.
                </p>
              </div>
            </div>

            {/* Adaptability */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Adaptability
              </h2>
              <p className='text-black/70 leading-relaxed'>
                The pedagogical pattern here  - start concrete, build to abstract, show the connections  - applies to any complex system. We have used similar approaches to explain cryptography (from XOR to public key), compression (from run-length to neural codecs), and optimisation (from gradient descent to modern optimisers).
              </p>
            </div>

            {/* Related Projects */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Related Projects
              </h2>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='/work/network-theory' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Network Theory →
                  </a>
                </li>
                <li>
                  <a href='/work/stellar-evolution' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Stellar Evolution →
                  </a>
                </li>
                <li>
                  <a href='/work/nuclide-chart' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Chart of Nuclides →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right column - metadata */}
          <div className='space-y-6 md:space-y-8'>

            {/* Technology */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Technology
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                React, TypeScript, SVG rendering. Custom Boolean circuit evaluation. Logistic regression, polynomial features, k-NN, and RBF kernel implemented from scratch for educational transparency.
              </p>
            </div>

            {/* Data */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Data
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Procedurally generated classification datasets (linearly separable, circular, XOR, two moons). Pre-defined circuit examples.
              </p>
            </div>

            {/* Status */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Status
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Core visualisations complete. Drag-and-drop circuit builder and additional classifier types in development.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
