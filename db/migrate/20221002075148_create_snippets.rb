class CreateSnippets < ActiveRecord::Migration[7.0]
  def change
    create_table :snippets do |t|
      t.string :title, null: false
      t.string :contents, null: false

      t.references :languages, foreign_key: true, null: false
      t.timestamps
    end
  end
end
