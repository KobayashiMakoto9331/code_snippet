class AddSortToSnippets < ActiveRecord::Migration[7.0]
  def change
    add_column :snippets, :sort, :integer
  end
end
